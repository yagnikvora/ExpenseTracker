import React from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";

const Header = () => {
  const {isLoggedIn} = useAuth();
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-wallet2 me-2 text-primary" viewBox="0 0 16 16">
          <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
        </svg>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ExpenseTracker</span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/transactions">Transactions</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/budgets">Budgets</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/categories">Categories</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">Profile</Link>
          </li>
        </ul>
        <div className="d-flex align-items-center ms-lg-4">
          {isLoggedIn ? ( 
            <Link to="/logout" className="btn btn-outline-primary ms-3">Logout</Link>) 
          :
          (<>
          <Link to="/login" className="btn btn-outline-primary ms-3">Login</Link>
          <Link to="/signup" className="btn btn-outline-primary ms-3">SignUp</Link>
          </>)
          }
           
          
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;
