import { Link, useNavigate } from 'react-router-dom';
import './css/Budget.css';
import { useEffect, useState } from 'react';
const apiUrl = "http://localhost:5000/api/Budgets"
const Budgets = () => {
 const [budget,setBudget] = useState([]);
 const navigate = useNavigate()
   const fetchBudgets = ()=>{
     fetch(apiUrl+"/GetAllBudgets")
     .then(res => res.json())
     .then(res=>setBudget(res));
   }
   useEffect(()=>{
     fetchBudgets();
   },[])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4 ">Your Budget Overview</h2>
      {/* <Link className="btn btn-success mb-3 ms-1" to="/budgets/addeditbudget">Add new Budget</Link> */}

      <div className="row">
        {budget.map((b) => (
          <div key={b.budgetId} className="col-md-4 mb-4 ">
            <div className="card budget-card shadow-sm border border-success rounded ">
              <div className="card-body">
                <h5 className="card-title budget-card-title text-center text-success">{b.categoryName}</h5>
                <h6 className='text-center'>Entered by: {b.userName}</h6>
                <p className="card-text budget-card-text text-center">
                  <strong className="text-dark">Amount:</strong> ₹{b.amount}
                </p>
                <div className="d-flex justify-content-between mt-2">
                  <p className="text-muted">
                    <strong>Start Date:</strong> {formatDate(b.startDate)}
                  </p>
                  <p className="text-muted">
                    <strong>End Date:</strong> {formatDate(b.endDate)}
                  </p>
                </div>
                <div className='d-flex justify-content-evenly'>
                  <button className='btn btn-outline-success' onClick={()=>{
                      navigate("/budgets/addeditbudget/"+b.budgetId)
                  }}>Edit</button>
                  <button className="btn btn-outline-danger" onClick={()=>{
                      if(confirm("Do you want to delete Budget "+b.categoryName))
                      {
                        fetch(apiUrl+"/DeleteBudgetsByID/" + b.budgetId, {
                          method: "DELETE",
                          }).then(() => { 
                            fetchBudgets() 
                          });
                      }
                    }}>Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Budgets;
