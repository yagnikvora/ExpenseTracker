namespace ExpenseTrackerApi.Models
{
    public class DashboardModel
    {
        public List<CountModel> Counts { get; set; }
        public List<RecentTransactionModel> RecentTransactions { get; set; }
        public List<CategoryExpenseModel> CategoryWiseExpenses { get; set; }
        public List<MonthlyTrendModel> MonthlyTrends { get; set; }
        public List<TopSpenderModel> TopSpenders { get; set; }
    }

    public class CountModel
    {
        public string Metric { get; set; }
        public int Value { get; set; }
    }

    public class RecentTransactionModel
    {
        public int TransactionID { get; set; }
        public string UserName { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public string Type { get; set; }
        public DateTime Date { get; set; }
    }

    public class CategoryExpenseModel
    {
        public string Category { get; set; }
        public decimal TotalAmount { get; set; }
    }

    public class MonthlyTrendModel
    {
        public string MonthYear { get; set; }
        public decimal TotalIncome { get; set; }
        public decimal TotalExpense { get; set; }
    }

    public class TopSpenderModel
    {
        public string UserName { get; set; }
        public decimal TotalSpent { get; set; }
    }
}
