using ExpanceTrackerApi.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExpanceTrackerApi.Data
{
    public class TransactionsRepository
    {
        private IConfiguration _configuration;
        public TransactionsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllTransactions
        public List<TransactionsModel> GetAllTransactions()
        {
            var budgets = new List<TransactionsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Transactions_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budgets.Add(new TransactionsModel
                {
                    TransactionId = Convert.ToInt32(reader["TransactionId"]),
                    UserName = reader["UserName"].ToString(),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    MethodName = reader["MethodName"].ToString(),
                    PaymentMethodId = Convert.ToInt32(reader["PaymentMethodId"]),
                    TransactionAmount = Convert.ToDouble(reader["TransactionAmount"]),
                    TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                    TransactionNotes = reader["TransactionNotes"].ToString(),
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
        public List<TransactionsModel> GetUserById(int TransactionsId)
        {
            var budget = new List<TransactionsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Transactions_SelectByID";
            command.Parameters.AddWithValue("TransactionId", TransactionsId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                budget.Add(new TransactionsModel
                {
                    TransactionId = Convert.ToInt32(reader["TransactionId"]),
                    UserName = reader["UserName"].ToString(),
                    CategoryName = reader["CategoryName"].ToString(),
                    CategoryId = Convert.ToInt32(reader["CategoryId"]),
                    MethodName = reader["MethodName"].ToString(),
                    PaymentMethodId = Convert.ToInt32(reader["PaymentMethodId"]),
                    TransactionAmount = Convert.ToDouble(reader["TransactionAmount"]),
                    TransactionDate = Convert.ToDateTime(reader["TransactionDate"]),
                    TransactionNotes = reader["TransactionNotes"].ToString(),
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
        public bool DeleteUserByID(int TransactionId)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Transactions_DeleteByID";
            command.Parameters.AddWithValue("TransactionId", TransactionId);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region InsertTransactions
        public bool InsertTransactions(TransactionsInsertUpdateModel budget)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Transactions_Insert";
            command.Parameters.AddWithValue("UserId", budget.UserId);
            command.Parameters.AddWithValue("CategoryId", budget.CategoryId);
            command.Parameters.AddWithValue("PaymentMethodId", budget.PaymentMethodId);
            command.Parameters.AddWithValue("TransactionAmount", budget.TransactionAmount);
            command.Parameters.AddWithValue("TransactionDate", budget.TransactionDate);
            command.Parameters.AddWithValue("TransactionNotes", budget.TransactionNotes);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }

        #endregion

        #region UpdateTransactions
        public bool UpdateTransactions(TransactionsInsertUpdateModel budget)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Transactions_UpdateByID";
            command.Parameters.AddWithValue("TransactionId", budget.TransactionId);
            command.Parameters.AddWithValue("UserId", budget.UserId);
            command.Parameters.AddWithValue("CategoryId", budget.CategoryId);
            command.Parameters.AddWithValue("PaymentMethodId", budget.PaymentMethodId);
            command.Parameters.AddWithValue("TransactionAmount", budget.TransactionAmount);
            command.Parameters.AddWithValue("TransactionDate", budget.TransactionDate);
            command.Parameters.AddWithValue("TransactionNotes", budget.TransactionNotes);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion
    }
}
