using ExpenseTracketApi.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExpenseTracketApi.Data
{
    public class PaymentMethodsRepository
    {
        private IConfiguration _configuration;
        public PaymentMethodsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllPaymentMethods
        public List<PaymentMethodsModel> GetAllPaymentMethods()
        {
            var paymentMethods = new List<PaymentMethodsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                paymentMethods.Add(new PaymentMethodsModel
                {
                    PaymentMethodId = Convert.ToInt32(reader["PaymentMethodId"]),
                    UserName = reader["UserName"].ToString(),
                    MethodName = reader["MethodName"].ToString(),
                    Details = reader["Details"].ToString(),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return paymentMethods;
        }
        #endregion

        #region PaymentMethodsDropdown
        public List<PaymentMethodsDropdownModel> PaymentMethodsDropdown()
        {
            var paymentMethods = new List<PaymentMethodsDropdownModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_Dropdown";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                paymentMethods.Add(new PaymentMethodsDropdownModel
                {
                    PaymentMethodId = Convert.ToInt32(reader["PaymentMethodId"]),
                    MethodName = reader["MethodName"].ToString(),
                    
                });
            }
            connection.Close();
            return paymentMethods;
        }
        #endregion

        #region GetPaymentMethodById
        public List<PaymentMethodsModel> GetPaymentMethodById(int PaymentMethodId)
        {
            var paymentMethod = new List<PaymentMethodsModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_SelectByID";
            command.Parameters.AddWithValue("PaymentMethodId", PaymentMethodId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                paymentMethod.Add(new PaymentMethodsModel
                {
                    PaymentMethodId = Convert.ToInt32(reader["PaymentMethodId"]),
                    UserName = reader["UserName"].ToString(),
                    MethodName = reader["MethodName"].ToString(),
                    Details = reader["Details"].ToString(),
                    UserId = Convert.ToInt32(reader["UserId"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return paymentMethod;
        }
        #endregion

        #region DeleteByID
        public bool DeleteUserByID(int PaymentMethodId)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_DeleteByID";
            command.Parameters.AddWithValue("PaymentMethodId", PaymentMethodId);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region InsertPaymentMethods
        public bool InsertPaymentMethods(PaymentMethodsInsertUpdateModel paymentMethod)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_Insert";
            command.Parameters.AddWithValue("MethodName", paymentMethod.MethodName);
            command.Parameters.AddWithValue("Details", paymentMethod.Details);
            command.Parameters.AddWithValue("UserId", paymentMethod.UserId);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }

        #endregion

        #region UpdatePaymentMethods
        public bool UpdatePaymentMethods(PaymentMethodsInsertUpdateModel paymentMethod)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_PaymentMethods_UpdateByID";
            command.Parameters.AddWithValue("PaymentMethodId", paymentMethod.PaymentMethodId);
            command.Parameters.AddWithValue("MethodName", paymentMethod.MethodName);
            command.Parameters.AddWithValue("Details", paymentMethod.Details);
            command.Parameters.AddWithValue("UserId", paymentMethod.UserId);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion
    }
}
