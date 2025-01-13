import './css/Budget.css'

const Budgets = () =>{
    const budgets = [
        {
          BudgetId: 24,
          UserName: "Emily Davis",
          CategoryName: "Business Income",
          CategoryId: 24,
          Amount: 5000.0,
          StartDate: "2024-01-01",
          EndDate: "2024-12-31",
        },
        {
          BudgetId: 25,
          UserName: "John Doe",
          CategoryName: "Mortgage",
          CategoryId: 25,
          Amount: 4500.0,
          StartDate: "2024-01-01",
          EndDate: "2024-12-31",
        },
        {
          BudgetId: 19,
          UserName: "Michael Johnson",
          CategoryName: "Savings",
          CategoryId: 19,
          Amount: 4000.0,
          StartDate: "2024-01-01",
          EndDate: "2024-12-31",
        },
        {
          BudgetId: 18,
          UserName: "Jane Smith",
          CategoryName: "Loan Repayment",
          CategoryId: 18,
          Amount: 3000.0,
          StartDate: "2024-01-01",
          EndDate: "2024-12-31",
        },
        {
          BudgetId: 13,
          UserName: "John Doe",
          CategoryName: "Education",
          CategoryId: 13,
          Amount: 2500.0,
          StartDate: "2024-01-01",
          EndDate: "2024-12-31",
        },
      ];
    
      return (
        <div className="container mt-4">
        <h2 className="text-center mb-4">Budget Cards</h2>
        <div className="row">
          {budgets.map((budget) => (
            <div key={budget.BudgetId} className="col-md-4 mb-4">
              <div className="budget-card">
                <h5 className="user-name">{budget.CategoryName}</h5>
                {/* <h6 className="category-name">{budget.CategoryName}</h6> */}
                <p>
                  <strong>Amount:</strong> ₹{budget.Amount.toFixed(2)}
                </p>
                <p>
                  <strong>Start Date:</strong> {budget.StartDate}
                </p>
                <p>
                  <strong>End Date:</strong> {budget.EndDate}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      );
    
}
export default Budgets