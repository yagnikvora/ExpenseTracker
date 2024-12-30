import React from "react";

const Header = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
    <div className="container">
      <a className="navbar-brand d-flex align-items-center" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-wallet2 me-2 text-primary" viewBox="0 0 16 16">
          <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
        </svg>
        <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ExpenseTracker</span>
      </a>
      {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button> */}
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <a className="nav-link" href="/dashboard">Dashboard</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/transactions">Transactions</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/reports">Budgets</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/settings">Users</a>
          </li>
        </ul>
        <div className="d-flex align-items-center ms-lg-4">
          <a href="/login" className="btn btn-outline-primary ms-3">Login</a>
          <a href="/signup" className="btn btn-outline-primary ms-3">SignUp</a>
        </div>
      </div>
    </div>
  </header>
  );
};

export default Header;
