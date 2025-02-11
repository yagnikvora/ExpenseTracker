import { Link, Navigate, useNavigate } from 'react-router-dom';
import './css/Budget.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { GridLoader } from 'react-spinners';
import LoadingScreen from '../Components/Loader';
const apiUrl = "http://localhost:5000/api/Budgets"
const Budgets = () => {
  const { isLoggedIn, authorizationToken } = useAuth();

  const [budget, setBudget] = useState([]);
  const toastId = "login-toast";
  const navigate = useNavigate()
  const fetchBudgets = async () => {
    await fetch(apiUrl + "/GetAllBudgets", {
      method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then(res => res.json())
      .then(res => setBudget(res));
  }
  useEffect(() => {
    fetchBudgets();
  }, [])
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (!isLoggedIn) {
    if (!toast.isActive(toastId)) {
      toast.error("Please Login First", { toastId });
    }
    return <Navigate to="/" />
  }
  else {
    if (budget.length == 0) {
      return (
        <LoadingScreen message="Please Wait" />
      );
    }
    else {
      return (
        <div className="container mt-4">
          <h2 className="text-center mb-4 ">Your Budget Overview</h2>
          <Link to="/budgets/addeditbudget" className="btn btn-primary mb-4 d-inline-flex align-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
              <path d="M2.5 0q-.25 0-.487.048l.194.98A1.5 1.5 0 0 1 2.5 1h.458V0zm2.292 0h-.917v1h.917zm1.833 0h-.917v1h.917zm1.833 0h-.916v1h.916zm1.834 0h-.917v1h.917zm1.833 0h-.917v1h.917zM13.5 0h-.458v1h.458q.151 0 .293.029l.194-.981A2.5 2.5 0 0 0 13.5 0m2.079 1.11a2.5 2.5 0 0 0-.69-.689l-.556.831q.248.167.415.415l.83-.556zM1.11.421a2.5 2.5 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415zM16 2.5q0-.25-.048-.487l-.98.194q.027.141.028.293v.458h1zM.048 2.013A2.5 2.5 0 0 0 0 2.5v.458h1V2.5q0-.151.029-.293zM0 3.875v.917h1v-.917zm16 .917v-.917h-1v.917zM0 5.708v.917h1v-.917zm16 .917v-.917h-1v.917zM0 7.542v.916h1v-.916zm15 .916h1v-.916h-1zM0 9.375v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .916v.917h1v-.917zm16 .917v-.917h-1v.917zm-16 .917v.458q0 .25.048.487l.98-.194A1.5 1.5 0 0 1 1 13.5v-.458zm16 .458v-.458h-1v.458q0 .151-.029.293l.981.194Q16 13.75 16 13.5M.421 14.89c.183.272.417.506.69.689l.556-.831a1.5 1.5 0 0 1-.415-.415zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373Q2.25 16 2.5 16h.458v-1H2.5q-.151 0-.293-.029zM13.5 16q.25 0 .487-.048l-.194-.98A1.5 1.5 0 0 1 13.5 15h-.458v1zm-9.625 0h.917v-1h-.917zm1.833 0h.917v-1h-.917zm1.834-1v1h.916v-1zm1.833 1h.917v-1h-.917zm1.833 0h.917v-1h-.917zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
            </svg>
            &nbsp;&nbsp;Add New Budget
          </Link>
          <div className="row">
            {budget.map((b) => (
              <div key={b.budgetId} className="col-md-4 mb-4 ">
                <div className="card budget-card shadow-sm border border-primary rounded ">
                  <div className="card-body">
                    <h5 className="card-title budget-card-title text-center text-primary">{b.categoryName}</h5>
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
                      <button className="btn btn-outline-primary btn-sm me-2 mt-1" onClick={() => {
                        navigate("/budgets/addeditbudget/" + b.budgetId)
                      }}>✏️ Edit</button>
                      <button className="btn btn-outline-danger btn-sm mt-1" onClick={async () => {
                        if (confirm("Do you want to delete Budget " + b.categoryName)) {
                          const response = await fetch(apiUrl + "/DeleteBudgetsByID/" + b.budgetId, {
                            method: "DELETE",
                            headers: {
                              Authorization: authorizationToken,
                            },
                          });

                          const responseData = await response.json();

                          if (response.ok) {
                            toast.success(b.categoryName + " " + responseData.message)
                            fetchBudgets();
                          }
                        }
                      }}>❌ Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

  }
};

export default Budgets;
