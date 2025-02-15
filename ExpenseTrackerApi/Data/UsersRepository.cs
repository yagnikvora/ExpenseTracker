﻿using ExpenseTracketApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using System.Data;
using System.Reflection;
using static ExpenseTracketApi.Models.UserLoginModel;

namespace ExpenseTracketApi.Data
{
    public class UsersRepository
    {
        private IConfiguration _configuration;
        public UsersRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        #region GetAllUsers
        public List<UsersModel> GetAllUsers()
        {
            var users = new List<UsersModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_SelectAll";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                users.Add(new UsersModel
                {
                    UserId = Convert.ToInt32(reader["UserId"]),
                    HOFId = Convert.ToInt32(reader["HOFId"]),
                    HOFName = reader["HOFName"].ToString(),
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    Mobile = reader["Mobile"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString(),
                    HOF = Convert.ToBoolean(reader["HOF"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return users;
        }
        #endregion

        #region User Login
        public UsersModel Login(UserLoginModel user)
        {
            UsersModel userData = null;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection( connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_Login";
            command.Parameters.AddWithValue("Email", user.Email);
            command.Parameters.AddWithValue("PasswordHash", user.PasswordHash);
            SqlDataReader reader = command.ExecuteReader();
            if (reader.Read())
            {
                userData = new UsersModel
                {
                    UserId = Convert.ToInt32(reader["UserId"]),
                    HOFId = Convert.ToInt32(reader["HOFId"]),
                    HOFName = reader["HOFName"].ToString(),
                    HOF = Convert.ToBoolean(reader["HOF"]),
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    Mobile = reader["Mobile"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString(),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                };
            }
            return userData;

        }
        #endregion

        #region UsersDropdown
        public List<UsersDropdownModel> UsersDropdown()
        {
            var users = new List<UsersDropdownModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_GetAllHOFs";
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                users.Add(new UsersDropdownModel
                {
                    UserId = Convert.ToInt32(reader["UserId"]),
                    Name = reader["Name"].ToString(),
                });
            }
            connection.Close();
            return users;
        }
        #endregion

        #region GetUserById
        public List<UsersModel> GetUserById(int UsersId)
        {
            var user = new List<UsersModel>();
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_SelectByID";
            command.Parameters.AddWithValue("UserId", UsersId);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                user.Add(new UsersModel
                {
                    UserId = Convert.ToInt32(reader["UserId"]),
                    HOFId = Convert.ToInt32(reader["HOFId"]),
                    HOFName = reader["HOFName"].ToString(),
                    Name = reader["Name"].ToString(),
                    Email = reader["Email"].ToString(),
                    Mobile = reader["Mobile"].ToString(),
                    PasswordHash = reader["PasswordHash"].ToString(),
                    HOF = Convert.ToBoolean(reader["HOF"]),
                    CreatedAt = Convert.ToDateTime(reader["CreatedAt"]),
                    ModifiedAt = Convert.ToDateTime(reader["ModifiedAt"])
                });
            }
            connection.Close();
            return user;
        }
        #endregion

        #region DeleteByID
        public bool DeleteUserByID(int UserId)
        {
            bool isDeleted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_DeleteByID";
            command.Parameters.AddWithValue("UserId", UserId);
            int rowsAffected = command.ExecuteNonQuery();
            isDeleted = rowsAffected > 0;
            return isDeleted;
        }
        #endregion

        #region Register
        public bool Register(UsersModel user)
        {
            bool isInserted = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_Insert";
            command.Parameters.AddWithValue("Name", user.Name);
            command.Parameters.AddWithValue("Email", user.Email);
            command.Parameters.AddWithValue("Mobile", user.Mobile);
            command.Parameters.AddWithValue("PasswordHash", user.PasswordHash);
            command.Parameters.AddWithValue("HOF", user.HOF);
            command.Parameters.AddWithValue("HOFId", user.HOFId);
            int rowsAffected = command.ExecuteNonQuery();
            isInserted = rowsAffected > 0;
            return isInserted;
        }

        #endregion

        

        #region UpdateUsers
        public bool UpdateUsers(UsersModel user)
        {
            bool isUpdate = false;
            string connectionString = _configuration.GetConnectionString("myConnectionString");
            SqlConnection connection = new SqlConnection(connectionString);
            connection.Open();
            SqlCommand command = connection.CreateCommand();
            command.CommandType = CommandType.StoredProcedure;
            command.CommandText = "PR_Users_UpdateByID";
            command.Parameters.AddWithValue("UserId", user.UserId);
            command.Parameters.AddWithValue("Name", user.Name);
            command.Parameters.AddWithValue("Email", user.Email);
            command.Parameters.AddWithValue("Mobile", user.Mobile);
            command.Parameters.AddWithValue("PasswordHash", user.PasswordHash);
            command.Parameters.AddWithValue("HOF", user.HOF );
            command.Parameters.AddWithValue("HOFId", user.HOFId);
            int rowsAffected = command.ExecuteNonQuery();
            isUpdate = rowsAffected > 0;
            return isUpdate;
        }
        #endregion
    }
}
