using ExpenseTracketApi.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExpenseTracketApi.Data
{
    public class CategoriesRepository
    {
        private IConfiguration _configuration;
        public CategoriesRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllCategories
        public List<CategoriesModel> GetAllCategories()
        {
            var category = new List<CategoriesModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                category.Add(new CategoriesModel
                {
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryType = reader["CategoryType"].ToString(),
                    CategoryDescription = reader["CategoryDescription"].ToString(),
                    UserName = reader["UserName"].ToString(),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return category;
        }
        #endregion

        #region CategoriesDropdown
        public List<CategoryDropdownModel> CategoriesDropdown()
        {
            var category = new List<CategoryDropdownModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_Dropdown";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                category.Add(new CategoryDropdownModel
                {
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    CategoryName = reader["CategoryName"].ToString()
                });
            }
            connection.Close();
            return category;
        }
        #endregion

        #region CategoriesRemainDropdown
        public List<CategoryDropdownModel> CategoriesRemainDropdown()
        {
            var category = new List<CategoryDropdownModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_Remain_Dropdown";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                category.Add(new CategoryDropdownModel
                {
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    CategoryName = reader["CategoryName"].ToString()
                });
            }
            connection.Close();
            return category;
        }
        #endregion

        #region GetCategoryById
        public List<CategoriesModel> GetCategoryById(int CategoryId)
        {
            var category = new List<CategoriesModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_SelectByID";
            command.Parameters.AddWithValue("CategoryId", CategoryId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                category.Add(new CategoriesModel
                {
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryType = reader["CategoryType"].ToString(),
                    CategoryDescription = reader["CategoryDescription"].ToString(),
                    UserName = reader["UserName"].ToString(),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return category;
        }
        #endregion

        #region DeleteByID
        public int DeleteCategoryByID(int CategoryId)
        {
            try
            {

                bool isDeleted = false;
                string connectionString = _configuration.GetConnectionString("myConnectionString");
                SqlConnection connection = new SqlConnection(connectionString);
                connection.Open();
                SqlCommand command = connection.CreateCommand();
                command.CommandType = CommandType.StoredProcedure;
                command.CommandText = "PR_Categories_DeleteByID";
                command.Parameters.AddWithValue("CategoryId", CategoryId);
                int rowsAffected = command.ExecuteNonQuery();
                return (rowsAffected > 0) ? 1 : 0;
            }
            catch (SqlException ex)
            {
                if (ex.Number == 547) // Foreign key constraint violation
                {
                    return -1; // Indicates foreign key constraint issue
                }
                throw;
            }
        }
        #endregion

        #region InsertCategories
        public bool InsertCategories(CategoriesInsertUpdateModel category)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_Insert";
            command.Parameters.AddWithValue("CategoryName", category.CategoryName);
            command.Parameters.AddWithValue("CategoryType", category.CategoryType);
            command.Parameters.AddWithValue("CategoryDescription", category.CategoryDescription);
            command.Parameters.AddWithValue("UserId", category.UserId);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }

        #endregion

        #region UpdateCategories
        public bool UpdateCategories(CategoriesInsertUpdateModel category)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Categories_UpdateByID";
            command.Parameters.AddWithValue("CategoryId", category.CategoryId);
            command.Parameters.AddWithValue("CategoryName", category.CategoryName);
            command.Parameters.AddWithValue("CategoryType", category.CategoryType);
            command.Parameters.AddWithValue("CategoryDescription", category.CategoryDescription);
            command.Parameters.AddWithValue("UserId", category.UserId);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion
    }
}
