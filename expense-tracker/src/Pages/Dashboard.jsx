import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./css/Dashboard.css";
import { Link, Navigate } from "react-router-dom";
import LoadingScreen from "../Components/LoadingScreen";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

// ✅ Register necessary Chart.js components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isLoggedIn } = useAuth();
    const toastId = "login-toast";
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')))



    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/Dashboard/GetDashboardData/" + userData.hofId); // Update API URL if needed
                if (!response.ok) {
                    console.log(response.json())
                    throw new Error("Failed to fetch data");
                }
                const data = await response.json();
                // console.log("API Response:", data); // ✅ Debug: Check API response structure
                setDashboardData(data);
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256); // Random Red (0-255)
        const g = Math.floor(Math.random() * 256); // Random Green (0-255)
        const b = Math.floor(Math.random() * 256); // Random Blue (0-255)
        const a = (Math.random() * 0.5 + 0.5).toFixed(2); // Random Alpha (0.5 - 1 for better visibility)
        return `rgba(${r}, ${g}, ${b}, ${a})`;
    };
    if (!isLoggedIn) {
        if (!toast.isActive(toastId)) {
            toast.error("Please Login First", { toastId });
        }
        return <Navigate to="/" />
    }
    if (loading) return <LoadingScreen message="Please Wait" />;
    // if (error) return <div className="text-center mt-5 text-danger">Error: {error}</div>;
    if (!dashboardData) {
        return (
            <LoadingScreen message="Please Wait" />
        );

    }
    const { counts = [], recentTransactions = [], categoryWiseExpenses = [], monthlyTrends = [], topSpenders = [] } = dashboardData;
    // ✅ Check if data exists before rendering
    const summaryCards = counts.length > 0 ? (
        counts.map((count) => (

            <div className="col-md-3">
                <div className="dashboard-card">
                    <div className="card-icon">
                        <i className={`fas ${count.metric === 'Total Users' ? 'fa-users' :
                            count.metric === 'Total Expenses' ? 'fa-money-bill-wave' :
                                count.metric === 'Total Income' ? 'fa-chart-line' :
                                    count.metric === 'Total Categories' ? 'fa-layer-group' : 'fa-question'}`}></i>
                    </div>
                    <div className="card-content">
                        <h5>{count.metric}</h5>
                        <h2>{count.value}</h2>
                    </div>
                </div>
            </div>
        ))
    ) : (
        <p className="text-center">No summary data available.</p>
    );

    const categoryExpenseChart = categoryWiseExpenses.length > 0
        ? {
            labels: categoryWiseExpenses.map((item) => item.category),
            datasets: [
                {
                    label: "Expenses",
                    data: categoryWiseExpenses.map((item) => item.totalAmount),
                    backgroundColor: categoryWiseExpenses.map(() => getRandomColor()),
                },
            ],
        }
        : null;

    const monthlyTrendsChart = monthlyTrends.length > 0
        ? {
            labels: monthlyTrends.map((item) => item.monthYear),
            datasets: [
                {
                    label: "Income",
                    data: monthlyTrends.map((item) => item.totalIncome),
                    backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
                {
                    label: "Expense",
                    data: monthlyTrends.map((item) => item.totalExpense),
                    backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
            ],
        }
        : null;

    const topSpendersChart = topSpenders.length > 0
        ? {
            labels: topSpenders.map((item) => item.userName),
            datasets: [
                {
                    label: "Total Spent",
                    data: topSpenders.map((item) => item.totalSpent),
                    backgroundColor: "rgba(153, 102, 255, 0.6)",
                },
            ],
        }
        : null;

    const pieOptions = {
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div className="container dash-container mt-4">
            <h2 className="text-center mb-4"></h2>

            {/* Summary Cards */}
            <div className="row mb-4">{summaryCards}</div>

            <div class="row">
                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header bg-primary text-white">
                            <h4>Category Wise Expense</h4>
                        </div>
                        <div class="card-body">
                            <Pie data={categoryExpenseChart} options={pieOptions} style={{ width: "400px", height: "300px" }} />
                        </div>
                    </div>
                </div>

                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header bg-primary text-white">
                            <h4>Monthly Income & Expense</h4>
                        </div>
                        <div class="card-body">
                            <Bar data={monthlyTrendsChart} options={pieOptions} style={{ width: "400px", height: "300px" }} />
                        </div>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header bg-primary text-white">
                            <h4>Top Spenders</h4>
                        </div>
                        <div class="card-body">
                            <Bar data={topSpendersChart} options={pieOptions} style={{ width: "400px", height: "300px" }} />
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card mb-4">
                        <div class="card-header bg-primary text-white">
                            <h4>Quick Links</h4>
                        </div>
                        <div className="rounded p-5">
                            <Link to="/" className="btn btn-outline-danger w-100 py-2 my-2 rounded">
                                🏠 Go To Home
                            </Link>
                            <Link to="/transactions/addedittransaction" className="btn btn-outline-success w-100 py-2 my-2 rounded">
                                ➕ Add New Transaction
                            </Link>
                            <Link to="/category/addeditcategory/" className="btn btn-outline-info w-100 py-2 my-2 rounded">
                                📂 Add New Category
                            </Link>
                            <Link to="/budgets/addeditbudget" className="btn btn-outline-warning w-100 py-2 my-2 rounded">
                                💰 Add New Budget
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="mt-5">
                <div className="card dash-card shadow-sm p-4">
                    <h5 className="text-primary mb-3">Recent Transactions</h5>
                    {recentTransactions.length > 0 ? (
                        <div className="table-responsive">
                            <table className="table table-hover table-borderless">
                                <thead className="table-light">
                                    <tr>
                                        <th>#TID</th>
                                        <th>User</th>
                                        <th>Amount</th>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentTransactions.map((tx, index) => (
                                        <tr key={tx.transactionID} className="align-middle">
                                            <td>{tx.transactionID}</td>
                                            <td className="fw-bold">{tx.userName}</td>
                                            <td>
                                                <span className={tx.type === 'Expense' ? 'text-danger' : 'text-success'}>
                                                    ${tx.amount.toFixed(2)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary">{tx.category}</span>
                                            </td>
                                            <td>
                                                <span className={`badge ${tx.type === 'Expense' ? 'bg-danger' : 'bg-success'}`}>
                                                    {tx.type}
                                                </span>
                                            </td>
                                            <td>{new Date(tx.date).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-center text-muted">No recent transactions available.</p>
                    )}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;
