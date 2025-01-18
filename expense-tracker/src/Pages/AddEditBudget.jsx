import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth"


const apiUrl = "http://localhost:5000/api/";

const AddEditBudget = () => {
    const { bid } = useParams();
    const navigate = useNavigate();
    const {isLoggedIn , authorizationToken} = useAuth();
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        BudgetId: "",
        UserId: "",
        CategoryId: "",
        Amount: "",
        StartDate: "",
        EndDate: "",
    });

    const [touched, setTouched] = useState({
        UserId: false,
        CategoryId: false,
        Amount: false,
        StartDate: false,
        EndDate: false,
    });

    const [errors, setErrors] = useState({
        UserId: "",
        CategoryId: "",
        Amount: "",
        StartDate: "",
        EndDate: "",
    });

    const validateField = (name, value) => {
        switch (name) {
            case "UserId":
                return value ? "" : "User selection is required.";
            case "CategoryId":
                return value ? "" : "Category selection is required.";
            case "Amount":
                return value && value > 0 ? "" : "Amount must be greater than 0.";
            case "StartDate":
                if (!value) {
                    return "Start date is required.";
                }
                return "";
            case "EndDate":
                if (!value) {
                    return "End date is required.";
                }
                const startDate = new Date(formData.StartDate);
                const endDate = new Date(value);
                if (endDate < startDate) {
                    return "End date cannot be before start date.";
                }
                return "";
            default:
                return "";
        }
    };

    useEffect(() => {
        if (bid) {
            fetch(apiUrl + "Budgets/GetAllBudgetsByID/" + bid ,  {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    setFormData({
                        BudgetId: res[0].budgetId,
                        UserId: res[0].userId,
                        CategoryId: res[0].categoryId,
                        Amount: res[0].amount,
                        StartDate: res[0].startDate.split("T")[0],  // Format to YYYY-MM-DD
                        EndDate: res[0].endDate.split("T")[0],      // Format to YYYY-MM-DD
                    });
                });
        }

        fetch(apiUrl + "Categories/CategoriesDropdown" ,  {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data));

        fetch(apiUrl + "Users/UsersDropdown" ,  {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));
    }, [bid]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if (touched[name]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: validateField(name, value),
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]: true,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: validateField(name, value),
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allTouched = Object.fromEntries(
            Object.keys(touched).map((key) => [key, true])
        );
        setTouched(allTouched);

        const newErrors = Object.fromEntries(
            Object.entries(formData).map(([key, value]) => [
                key,
                validateField(key, value),
            ])
        );
        setErrors(newErrors);

        if (Object.values(newErrors).every((error) => error === "")) {
            if (bid) {
                fetch(apiUrl + "Budgets/UpdateBudgets/" + bid, {
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json",  Authorization: authorizationToken, },
                    method: "PUT",
                }).then(() => navigate("/budgets"));
            } else {
                const { BudgetId, ...rest } = formData;
                fetch(apiUrl + "Budgets/InsertBudget", {
                    body: JSON.stringify(rest),
                    headers: { "Content-Type": "application/json",  Authorization: authorizationToken, },
                    method: "POST",
                }).then(() => navigate("/budgets"));
            }
        }
    };

    const handleReset = () => {
        setFormData({
            BudgetId: "",
            UserId: "",
            CategoryId: "",
            Amount: "",
            StartDate: "",
            EndDate: "",
        });
        setTouched({
            UserId: false,
            CategoryId: false,
            Amount: false,
            StartDate: false,
            EndDate: false,
        });
        setErrors({
            UserId: "",
            CategoryId: "",
            Amount: "",
            StartDate: "",
            EndDate: "",
        });
    };

    if (!isLoggedIn) {
        return <Navigate to="/" />
    }
    else {
        return (
            <div className="container my-5">
                <div className="card">
                    <div className="card-header bg-success text-white">
                        <h3 className="mb-0">{bid > 0 ? "Edit" : "Add"} Budget</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            {/* Username Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="UserId" className="form-label">
                                    <strong>Username:</strong>
                                </label>
                                <select
                                    id="UserId"
                                    name="UserId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.UserId}
                                    className={`form-select ${errors.UserId ? "is-invalid" : ""}`}
                                >
                                    <option value="" disabled>Select User</option>
                                    {users.map((u) => (
                                        <option key={u.userId} value={u.userId}>
                                            {u.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.UserId && <div className="invalid-feedback">{errors.UserId}</div>}
                            </div>

                            {/* Category Type Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="CategoryId" className="form-label">
                                    <strong>Category Type:</strong>
                                </label>
                                <select
                                    id="CategoryId"
                                    name="CategoryId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.CategoryId}
                                    className={`form-select ${errors.CategoryId ? "is-invalid" : ""}`}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories.map((c) => (
                                        <option key={c.categoryId} value={c.categoryId}>
                                            {c.categoryName}
                                        </option>
                                    ))}
                                </select>
                                {errors.CategoryId && <div className="invalid-feedback">{errors.CategoryId}</div>}
                            </div>

                            {/* Amount Input */}
                            <div className="mb-3">
                                <label htmlFor="Amount" className="form-label">
                                    <strong>Amount:</strong>
                                </label>
                                <input
                                    type="number"
                                    id="Amount"
                                    name="Amount"
                                    value={formData.Amount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.Amount ? "is-invalid" : ""}`}
                                    placeholder="Enter Amount"
                                    required
                                />
                                {errors.Amount && <div className="invalid-feedback">{errors.Amount}</div>}
                            </div>

                            {/* Start Date Input */}
                            <div className="mb-3">
                                <label htmlFor="StartDate" className="form-label">
                                    <strong>Start Date:</strong>
                                </label>
                                <input
                                    type="date"
                                    id="StartDate"
                                    name="StartDate"
                                    value={formData.StartDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.StartDate ? "is-invalid" : ""}`}
                                    required
                                />
                                {errors.StartDate && <div className="invalid-feedback">{errors.StartDate}</div>}
                            </div>

                            {/* End Date Input */}
                            <div className="mb-3">
                                <label htmlFor="EndDate" className="form-label">
                                    <strong>End Date:</strong>
                                </label>
                                <input
                                    type="date"
                                    id="EndDate"
                                    name="EndDate"
                                    value={formData.EndDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.EndDate ? "is-invalid" : ""}`}
                                    required
                                />
                                {errors.EndDate && <div className="invalid-feedback">{errors.EndDate}</div>}
                            </div>

                            {/* Buttons */}
                            <button type="submit" className={bid > 0 ? "btn btn-warning" : "btn btn-success"}>
                                {bid > 0 ? "Edit" : "Submit"}
                            </button>
                            <button type="button" onClick={handleReset} className="ms-3 btn btn-secondary">
                                Reset
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

export default AddEditBudget;
