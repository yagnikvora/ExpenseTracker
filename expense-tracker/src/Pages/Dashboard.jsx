import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

// Placeholder data for the chart
const spendingData = [
    { name: 'Jan', amount: 4000 },
    { name: 'Feb', amount: 3000 },
    { name: 'Mar', amount: 2000 },
    { name: 'Apr', amount: 2780 },
    { name: 'May', amount: 1890 },
    { name: 'Jun', amount: 2390 },
];

// Placeholder data for recent transactions
const recentTransactions = [
    { id: 1, date: '2023-06-15', description: 'Grocery Shopping', amount: -120.50, category: 'Food' },
    { id: 2, date: '2023-06-14', description: 'Salary Deposit', amount: 3000.00, category: 'Income' },
    { id: 3, date: '2023-06-13', description: 'Electric Bill', amount: -85.20, category: 'Utilities' },
    { id: 4, date: '2023-06-12', description: 'Restaurant Dinner', amount: -65.30, category: 'Dining Out' },
];


const Dashboard = () => {
    const { isLoggedIn } = useAuth();
    const [totalAmount, setTotalAmount] = useState(1500);
    const [income, setIncome] = useState(1000);
    const [expense, setExpense] = useState(1000);
    const [remainBudget, setRemainBudget] = useState((totalAmount + income - expense));

    const toastId = "login-toast";

    if (!isLoggedIn) {
        if (!toast.isActive(toastId)) {
            toast.error("Please Login First", { toastId });
          }
        return <Navigate to="/" />
    }
    else {
        return (
            <div className="container-fluid py-4 bg-light">
                <div className='container'>
                    {/* Summary Cards */}
                    <div className="row mb-4">
                        <div className="col-md-3 mb-3">
                            <div className="card bg-info bg-opacity-25 h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-info-emphasis">Total Budget</h5>
                                    <h2 className="card-text text-dark">₹{totalAmount}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-success bg-opacity-25 h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-success">Income</h5>
                                    <h2 className="card-text text-dark">₹{income}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-danger bg-opacity-25 h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-danger">Expenses</h5>
                                    <h2 className="card-text text-dark">₹{expense}</h2>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-3 mb-3">
                            <div className="card bg-warning bg-opacity-25 h-100 border-0">
                                <div className="card-body">
                                    <h5 className="card-title text-warning-emphasis">Remaining Budget</h5>
                                    <h2 className="card-text text-dark">₹{remainBudget}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Spending Chart */}
                    <div className="row mb-4">
                        <div className="col-md-8 mb-3">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Monthly Spending</h5>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={spendingData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                            <XAxis dataKey="name" stroke="#888" />
                                            <YAxis stroke="#888" />
                                            <Tooltip />
                                            <Legend />
                                            <Bar dataKey="amount" fill="#8dd1e1" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <div className="card h-100 border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Quick Actions</h5>
                                    <div className="d-grid gap-2">
                                        <button className="btn btn-outline-info">Add Income</button>
                                        <button className="btn btn-outline-danger">Add Expense</button>
                                        <button className="btn btn-outline-secondary">Generate Report</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="row">
                        <div className="col-12">
                            <div className="card border-0 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title text-primary">Recent Transactions</h5>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead className="table-light">
                                                <tr>
                                                    <th>Date</th>
                                                    <th>Description</th>
                                                    <th>Category</th>
                                                    <th>Amount</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {recentTransactions.map((transaction) => (
                                                    <tr key={transaction.id}>
                                                        <td>{transaction.date}</td>
                                                        <td>{transaction.description}</td>
                                                        <td>{transaction.category}</td>
                                                        <td className={transaction.amount < 0 ? 'text-danger' : 'text-success'}>
                                                            ₹{Math.abs(transaction.amount).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default Dashboard;