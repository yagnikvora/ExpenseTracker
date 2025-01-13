import React from "react";

const Footer = () => {
  return (
    <footer className="bg-light mt-auto py-4 shadow-sm">
      <div className="container">
        <div className="row">
          <div className="col-lg-5 mb-3 mb-lg-0">
            <a className="d-flex align-items-center text-decoration-none" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-wallet2 me-2 text-primary" viewBox="0 0 16 16">
                <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499L12.136.326zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484L5.562 3zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-13z"/>
              </svg>
              <span style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ExpenseTracker</span>
            </a>
            <p className="mt-2 text-muted">Simplify your finances with our easy-to-use expense tracking solution.</p>
          </div>
          {/* <div className="col-lg-2 col-md-4 mb-3 mb-md-0 offset-5">
            <h5 className="text-dark">Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="/dashboard" className="text-muted text-decoration-none">Dashboard</a></li>
              <li><a href="/transactions" className="text-muted text-decoration-none">Transactions</a></li>
              <li><a href="/reports" className="text-muted text-decoration-none">Reports</a></li>
              <li><a href="/settings" className="text-muted text-decoration-none">Settings</a></li>
            </ul>
          </div> */}
        </div>
        <hr className="my-4" />
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="text-muted mb-0">&copy; 2023 ExpenseTracker. All rights reserved.</p>
          </div>
          <div className="col-md-6 text-center text-md-end mt-3 mt-md-0">
            <a href="/privacy" className="text-muted text-decoration-none me-3">Privacy Policy</a>
            <a href="/terms" className="text-muted text-decoration-none">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
    
  );
};

export default Footer;
