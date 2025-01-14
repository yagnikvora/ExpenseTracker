using ExpenseTracketApi.Models;
using Microsoft.Data.SqlClient;
using System;
using System.Data;

namespace ExpenseTracketApi.Data
{
    public class BudgetsRepository
    {
        private IConfiguration _configuration;
        public BudgetsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllBudgets
        public List<BudgetsModel> GetAllBudgets()
        {
            var budgets = new List<BudgetsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budgets.Add(new BudgetsModel
                {
                    BudgetId = Convert.ToInt32(reader["BudgetId"]),
                    UserName = reader["UserName"].ToString(),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    Amount = Convert.ToDouble(reader["Amount"]),
                    StartDate = DateOnly.FromDateTime(Convert.ToDateTime(reader["StartDate"])),
                    EndDate = DateOnly.FromDateTime(Convert.ToDateTime(reader["EndDate"])),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return budgets;
        }
        #endregion

        #region GetUserById
        public List<BudgetsModel> GetUserById(int BudgetsId)
        {
            var budget = new List<BudgetsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_SelectByID";
            command.Parameters.AddWithValue("BudgetId", BudgetsId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budget.Add(new BudgetsModel
                {
                    BudgetId = Convert.ToInt32(reader["BudgetId"]),
                    UserName = reader["UserName"].ToString(),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    Amount = Convert.ToDouble(reader["Amount"]),
                    StartDate = DateOnly.FromDateTime(Convert.ToDateTime(reader["StartDate"])),
                    EndDate = DateOnly.FromDateTime(Convert.ToDateTime(reader["EndDate"])),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"]) 
                });
            }
            connection.Close();
            return budget;
        }
        #endregion

        #region DeleteByID
        public bool DeleteUserByID(int BudgetId)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_DeleteByID";
            command.Parameters.AddWithValue("BudgetId", BudgetId);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region InsertBudgets
        public bool InsertBudgets(BudgetsInsertUpdateModel budget)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_Insert";
            command.Parameters.AddWithValue("CategoryId", budget.CategoryId);
            command.Parameters.AddWithValue("UserId", budget.UserId);
            command.Parameters.AddWithValue("Amount", budget.Amount);
            command.Parameters.AddWithValue("StartDate", budget.StartDate);
            command.Parameters.AddWithValue("EndDate", budget.EndDate);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }

        #endregion

        #region UpdateBudgets
        public bool UpdateBudgets(BudgetsInsertUpdateModel budget)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_UpdateByID";
            command.Parameters.AddWithValue("BudgetId", budget.BudgetId);
            command.Parameters.AddWithValue("CategoryId", budget.CategoryId);
            command.Parameters.AddWithValue("UserId", budget.UserId);
            command.Parameters.AddWithValue("Amount", budget.Amount);
            command.Parameters.AddWithValue("StartDate", budget.StartDate);
            command.Parameters.AddWithValue("EndDate", budget.EndDate);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion

        #region RemainBudgetAllCategories
        public List<RemainBudgets> RemainBudgetAllCategories()
        {
            var budgets = new List<RemainBudgets>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_GetBudgetSummaryForAllCategoty";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budgets.Add(new RemainBudgets
                {
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryType = reader["CategoryType"].ToString(),
                    BudgetAmount =Convert.ToDouble( reader["BudgetAmount"]),
                    Spent_Amount = Double.Parse(reader["Spent_Amount"].ToString()),
                    Remaining_Budget = Convert.ToDouble(reader["Remaining_Budget"])                    
                });
            }
            connection.Close();
            return budgets;
        }
        #endregion

        #region BudgetUsedByUser
        public List<RemainBudgets> BudgetUsedByUser(int UserId)
        {
            var budgets = new List<RemainBudgets>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Budgets_GetBudgetSummaryByUser";
            command.Parameters.AddWithValue("UserId", UserId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budgets.Add(new RemainBudgets
                {
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryType = reader["CategoryType"].ToString(),
                    BudgetAmount = Convert.ToDouble(reader["BudgetAmount"]),
                    Spent_Amount = Double.Parse(reader["Spent_Amount"].ToString()),
                    Remaining_Budget = Convert.ToDouble(reader["Remaining_Budget"])
                });
            }
            connection.Close();
            return budgets;
        }
        #endregion
    }
}
