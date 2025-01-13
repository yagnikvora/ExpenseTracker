import React, { useEffect, useState } from 'react';
import { useAsyncError, useNavigate, useParams } from 'react-router-dom';
const apiUrl = 'http://localhost:5000/api/';
const AddEditTransactions = () => {

    const { tid } = useParams();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        TransactionId: '',
        UserId: '',
        CategoryId: '',
        PaymentMethodId: '',
        TransactionAmount: '',
        TransactionDate: '',
        TransactionNotes: '',
    });

    useEffect(() => {

        if (tid) {
            fetch(apiUrl + 'Transactions/GetAllTransactionsByID/' + tid)
                .then(res => res.json())
                .then(res => {
                    setFormData({
                        TransactionId: res[0].transactionId,
                        UserId: res[0].userId,
                        CategoryId: res[0].categoryId,
                        PaymentMethodId: res[0].paymentMethodId,
                        TransactionAmount: res[0].transactionAmount,
                        TransactionDate: res[0].transactionDate.split('T')[0],
                        TransactionNotes: res[0].transactionNotes,
                    })
                });
        }
       
        // Fetch categories from API
        fetch(apiUrl + 'Categories/CategoriesDropdown') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setCategories(data))
            .catch((error) => console.error('Error fetching usernames:', error));

        fetch(apiUrl + 'Users/UsersDropdown') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error('Error fetching usernames:', error));

        fetch(apiUrl + 'PaymentMethods/PaymentMethodsDropdown') // Replace with your API endpoint
            .then((response) => response.json())
            .then((data) => setPaymentMethods(data))
            .catch((error) => console.error('Error fetching usernames:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (tid) {
            fetch(apiUrl + "Transactions/UpdateTransactions/" + tid, {
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "PUT"
            })
            .then((response) => {
                if (!response.ok) {
                   console.log(response)
                }
                return response.json();
            })
            .then(() => {
                navigate("/transactions");
            })
            
        } else {
            fetch(apiUrl+"Transactions/InsertTransactions", {
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST"
            }).then(() => { navigate("/transactions") });
        }

        setFormData({
            TransactionId: '',
            UserId: '',
            CategoryId: '',
            PaymentMethodId: '',
            TransactionAmount: '',
            TransactionDate: '',
            TransactionNotes: '',
        });
    };

    const handleReset = () => {
        setFormData({
            TransactionId: '',
            UserId: '',
            CategoryId: '',
            PaymentMethodId: '',
            TransactionAmount: '',
            TransactionDate: '',
            TransactionNotes: '',
        });
    };

    return (
        <div className="container mt-5">
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
                                value={formData.UserId}
                                className="form-select"
                            >
                                <option value="" selected disabled>Select User</option>
                                {users.map((u) => (
                                    <option key={u.userId} value={u.userId}>
                                        {u.name}
                                    </option>
                                ))}
                            </select>
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
                                value={formData.CategoryId}
                                className="form-select"
                            >
                                <option value="" selected disabled>Select Category</option>
                                {categories.map((c) => (
                                    <option key={c.categoryId} value={c.categoryId}>
                                        {c.categoryName}
                                    </option>
                                ))}
                            </select>

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
                                value={formData.PaymentMethodId}
                                className="form-select"
                            >
                                <option value="" selected disabled>Select Payment Method</option>
                                {paymentMethods.map((p) => (
                                    <option key={p.paymentMethodId} value={p.paymentMethodId}>
                                        {p.methodName}
                                    </option>
                                ))}
                            </select>
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
                                className="form-control"
                                placeholder="Enter Transaction Amount"
                                required
                            />
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
                                className="form-control"
                                required
                            />
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
                                className="form-control"
                                rows="3"
                                placeholder="Add Transaction Notes"
                            />
                        </div>

                        {/* Buttons */}
                        <button type="submit" className={tid > 0 ? "btn btn-warning" : "btn btn-primary"}>
                            {tid > 0 ? "Edit" :"Submit"}
                        </button>
                        <button type="button" onClick={handleReset} className="ms-3 btn btn-secondary">
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddEditTransactions;
