using ExpenseTrackerApi.Models;
using Microsoft.Data.SqlClient;
using System.Data;

namespace ExpenseTrackerApi.Data
{
    public class DashboardRepository
    {
        private readonly IConfiguration _configuration;

        public DashboardRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public DashboardModel GetDashboardData()
        {
            var dashboard = new DashboardModel
            {
                Counts = new List<CountModel>(),
                RecentTransactions = new List<RecentTransactionModel>(),
                CategoryWiseExpenses = new List<CategoryExpenseModel>(),
                MonthlyTrends = new List<MonthlyTrendModel>(),
                TopSpenders = new List<TopSpenderModel>()
            };

            string connectionString = _configuration.GetConnectionString("myConnectionString");
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                connection.Open();
                using (SqlCommand command = new SqlCommand("usp_GetExpenseDashboard", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;
                    using (SqlDataReader reader = command.ExecuteReader())
                    {
                        // Read Counts
                        while (reader.Read())
                        {
                            dashboard.Counts.Add(new CountModel
                            {
                                Metric = reader["Metric"].ToString(),
                                Value = Convert.ToInt32(reader["Value"])
                            });
                        }

                        // Read Recent Transactions
                        reader.NextResult();
                        while (reader.Read())
                        {
                            dashboard.RecentTransactions.Add(new RecentTransactionModel
                            {
                                TransactionID = Convert.ToInt32(reader["TransactionID"]),
                                UserName = reader["UserName"].ToString(),
                                Amount = Convert.ToDecimal(reader["Amount"]),
                                Category = reader["Category"].ToString(),
                                Type = reader["Type"].ToString(),
                                Date = Convert.ToDateTime(reader["Date"])
                            });
                        }

                        // Read Category-Wise Expenses
                        reader.NextResult();
                        while (reader.Read())
                        {
                            dashboard.CategoryWiseExpenses.Add(new CategoryExpenseModel
                            {
                                Category = reader["Category"].ToString(),
                                TotalAmount = Convert.ToDecimal(reader["TotalAmount"])
                            });
                        }

                        // Read Monthly Trends
                        reader.NextResult();
                        while (reader.Read())
                        {
                            dashboard.MonthlyTrends.Add(new MonthlyTrendModel
                            {
                                MonthYear = reader["MonthYear"].ToString(),
                                TotalIncome = Convert.ToDecimal(reader["TotalIncome"]),
                                TotalExpense = Convert.ToDecimal(reader["TotalExpense"])
                            });
                        }

                        // Read Top Spenders
                        reader.NextResult();
                        while (reader.Read())
                        {
                            dashboard.TopSpenders.Add(new TopSpenderModel
                            {
                                UserName = reader["UserName"].ToString(),
                                TotalSpent = Convert.ToDecimal(reader["TotalSpent"])
                            });
                        }
                    }
                }
            }
            return dashboard;
        }
    }
}
