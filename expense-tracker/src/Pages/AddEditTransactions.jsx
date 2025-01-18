import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";

const apiUrl = "http://localhost:5000/api/";

const AddEditTransactions = () => {
    const { tid } = useParams();
    const { isLoggedIn , authorizationToken } = useAuth();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        TransactionId: "",
        UserId: "",
        CategoryId: "",
        PaymentMethodId: "",
        TransactionAmount: "",
        TransactionDate: "",
        TransactionNotes: "",
    });

    const [touched, setTouched] = useState({
        UserId: false,
        CategoryId: false,
        PaymentMethodId: false,
        TransactionAmount: false,
        TransactionDate: false,
        TransactionNotes: false,
    });

    const [errors, setErrors] = useState({
        UserId: "",
        CategoryId: "",
        PaymentMethodId: "",
        TransactionAmount: "",
        TransactionDate: "",
        TransactionNotes: "",
    });

    const validateField = (name, value) => {
        switch (name) {
            case "UserId":
                return value ? "" : "User selection is required.";
            case "CategoryId":
                return value ? "" : "Category selection is required.";
            case "PaymentMethodId":
                return value ? "" : "Payment method selection is required.";
            case "TransactionAmount":
                return value && value > 0 ? "" : "Transaction amount must be greater than 0.";
            case "TransactionDate":
                if (!value) {
                    return "Transaction date is required.";
                }
                const currentDate = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
                if (value > currentDate) {
                    return "Transaction date cannot be in the future.";
                }
                return "";
            case "TransactionNotes":
                return value.trim() ? "" : "Transaction notes are required.";
            default:
                return "";
        }
    };

    useEffect(() => {
        if (tid) {
            fetch(apiUrl + "Transactions/GetAllTransactionsByID/" + tid, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                },
            })
                .then((res) => res.json())
                .then((res) => {
                    setFormData({
                        TransactionId: res[0].transactionId,
                        UserId: res[0].userId,
                        CategoryId: res[0].categoryId,
                        PaymentMethodId: res[0].paymentMethodId,
                        TransactionAmount: res[0].transactionAmount,
                        TransactionDate: res[0].transactionDate.split("T")[0],
                        TransactionNotes: res[0].transactionNotes,
                    });
                });
        }

        fetch(apiUrl + "Categories/CategoriesDropdown", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setCategories(data));

        fetch(apiUrl + "Users/UsersDropdown",  {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));

        fetch(apiUrl + "PaymentMethods/PaymentMethodsDropdown",  {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setPaymentMethods(data));
    }, [tid]);

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
            if (tid) {
                fetch(apiUrl + "Transactions/UpdateTransactions/" + tid, {
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json" ,  Authorization: authorizationToken,},
                    method: "PUT",
                }).then(() => navigate("/transactions"));
            } else {
                const { TransactionId, ...rest } = formData;
                fetch(apiUrl + "Transactions/InsertTransactions", {
                    body: JSON.stringify(rest),
                    headers: { "Content-Type": "application/json" ,  Authorization: authorizationToken,},
                    method: "POST",
                }).then(() => navigate("/transactions"));
            }
        }
    };  
    const handleReset = () => {
        setFormData({
            TransactionId: "",
            UserId: "",
            CategoryId: "",
            PaymentMethodId: "",
            TransactionAmount: "",
            TransactionDate: "",
            TransactionNotes: "",
        });
        setTouched({
            UserId: false,
            CategoryId: false,
            PaymentMethodId: false,
            TransactionAmount: false,
            TransactionDate: false,
            TransactionNotes: false,
        });
        setErrors({
            UserId: "",
            CategoryId: "",
            PaymentMethodId: "",
            TransactionAmount: "",
            TransactionDate: "",
            TransactionNotes: "",
        });
    };

    if (!isLoggedIn) {
        return <Navigate to="/" />
    }
    else {

        return (
            <div className="container my-5">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        <h3 className="mb-0">{tid > 0 ? "Edit" : "Add"} Transaction</h3>
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

                            {/* Payment Method Dropdown */}
                            <div className="mb-3">
                                <label htmlFor="PaymentMethodId" className="form-label">
                                    <strong>Payment Method:</strong>
                                </label>
                                <select
                                    id="PaymentMethodId"
                                    name="PaymentMethodId"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={formData.PaymentMethodId}
                                    className={`form-select ${errors.PaymentMethodId ? "is-invalid" : ""}`}
                                >
                                    <option value="" disabled>Select Payment Method</option>
                                    {paymentMethods.map((p) => (
                                        <option key={p.paymentMethodId} value={p.paymentMethodId}>
                                            {p.methodName}
                                        </option>
                                    ))}
                                </select>
                                {errors.PaymentMethodId && <div className="invalid-feedback">{errors.PaymentMethodId}</div>}
                            </div>

                            {/* TransactionAmount Input */}
                            <div className="mb-3">
                                <label htmlFor="TransactionAmount" className="form-label">
                                    <strong>Transaction Amount:</strong>
                                </label>
                                <input
                                    type="number"
                                    id="TransactionAmount"
                                    name="TransactionAmount"
                                    value={formData.TransactionAmount}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.TransactionAmount ? "is-invalid" : ""}`}
                                    placeholder="Enter Transaction Amount"
                                    required
                                />
                                {errors.TransactionAmount && (<div className="invalid-feedback">{errors.TransactionAmount}</div>)}

                            </div>

                            {/* TransactionDate Input */}
                            <div className="mb-3">
                                <label htmlFor="TransactionDate" className="form-label">
                                    <strong>Transaction Date:</strong>
                                </label>
                                <input
                                    type="date"
                                    id="TransactionDate"
                                    name="TransactionDate"
                                    value={formData.TransactionDate}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.TransactionDate ? "is-invalid" : ""}`}
                                    required
                                />
                                {errors.TransactionDate && (<div className="invalid-feedback">{errors.TransactionDate}</div>)}

                            </div>

                            {/* TransactionNotes Textarea */}
                            <div className="mb-3">
                                <label htmlFor="TransactionNotes" className="form-label">
                                    <strong>Transaction Notes:</strong>
                                </label>
                                <textarea
                                    id="TransactionNotes"
                                    name="TransactionNotes"
                                    value={formData.TransactionNotes}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.TransactionNotes ? "is-invalid" : ""}`}
                                    rows="3"
                                    placeholder="Add Transaction Notes"
                                />
                                {errors.TransactionNotes && (<div className="invalid-feedback">{errors.TransactionNotes}</div>)}

                            </div>

                            {/* Buttons */}
                            <button type="submit" className={tid > 0 ? "btn btn-warning" : "btn btn-primary"}>
                                {tid > 0 ? "Edit" : "Submit"}
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

export default AddEditTransactions;
