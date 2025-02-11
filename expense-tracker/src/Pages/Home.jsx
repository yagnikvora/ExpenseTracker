import { useEffect, useState } from "react";
import { useAuth } from "../store/auth"
import { Link } from "react-router-dom";
import "./css/Home.css"
const Home = () => {
  const { isLoggedIn } = useAuth();
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userData')))
  }, [])
  return (

    <main className="flex-grow-1">
      {/* Hero Section */}
      <section className="bg-light py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="display-4 fw-bold mb-3">Take Control of Your Expances</h1>
              <p className="lead mb-4">ExpenseTracker helps you manage your money effortlessly. Track expenses, set budgets, and achieve your financial goals.</p>
              {isLoggedIn
                ?
                // <h2 className="lead mb-4">Welcome {user.name}</h2> 
                <div className="welcome-banner">
                  <h2 className="welcome-text">
                    Welcome <span className="highlight-name">{user.name}</span>
                  </h2>
                </div>
                : <Link to="/signup" className="btn btn-primary btn-lg me-3">Get Started</Link>}

            </div>
            <div className="col-lg-6">
              <img src="src\assets\Expance.jpg" alt="Expense Tracking Dashboard" className="img-fluid rounded shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose ExpenseTracker?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-graph-up text-primary mb-3" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z" />
                  </svg>
                  <h3 className="card-title h4">Easy Expense Tracking</h3>
                  <p className="card-text">Effortlessly log your expenses and income with our intuitive interface.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-pie-chart text-primary mb-3" viewBox="0 0 16 16">
                    <path d="M7.5 1.018a7 7 0 0 0-4.79 11.566L7.5 7.793V1.018zm1 0V7.5h6.482A7.001 7.001 0 0 0 8.5 1.018zM14.982 8.5H8.207l-4.79 4.79A7 7 0 0 0 14.982 8.5zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
                  </svg>
                  <h3 className="card-title h4">Insightful Reports</h3>
                  <p className="card-text">Gain valuable insights with our detailed financial reports and analytics.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 border-0 shadow-sm">
                <div className="card-body text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" className="bi bi-shield-check text-primary mb-3" viewBox="0 0 16 16">
                    <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                    <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  </svg>
                  <h3 className="card-title h4">Secure & Private</h3>
                  <p className="card-text">Your financial data is encrypted and protected with bank-level security.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">How It Works</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>1</div>
                <h3 className="h5">Sign Up</h3>
                <p>Create your free account in minutes.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>2</div>
                <h3 className="h5">Track Expenses</h3>
                <p>Log your income and expenses easily.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '64px', height: '64px' }}>3</div>
                <h3 className="h5">Gain Insights</h3>
                <p>View reports and optimize your finances.</p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="mb-4 text-white">Ready to Take Control of Your Finances?</h2>
          <p className="lead mb-4">Join thousands of users who have already transformed their financial lives with ExpenseTracker.</p>
          {isLoggedIn
            ? <Link to="/dashboard" className="btn btn-light btn-lg">Go to Dashboard</Link>
            : <Link to="/signup" className="btn btn-light btn-lg">Get Started</Link>}



        </div>
      </section>
    </main>
  )
}

export default Home