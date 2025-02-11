import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:5000/api/";

const EditUser = () => {
    const navigate = useNavigate();

    const { authorizationToken, storeUserInLS } = useAuth();

    const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("userData")));

    const [formData, setFormData] = useState({
        UserId: loggedInUser.userId,
        Name: "",
        Email: "",
        Mobile: "",
        PasswordHash: "",
        CreatedAt: "",
        ModifiedAt: ""
    })

    const [touched, setTouched] = useState({
        UserId: false,
        Name: false,
        Email: false,
        Mobile: false,
        PasswordHash: false
    })

    const [errors, setErrors] = useState({
        UserId: "",
        Name: "",
        Email: "",
        Mobile: "",
        PasswordHash: "",
    })

    useEffect(() => {
        fetch(apiUrl + "Users/GetAllUsersByID/" + loggedInUser.userId, {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((res) => res.json())
            .then((res) => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    UserId: loggedInUser.userId,
                    Name: res[0].name,
                    Email: res[0].email,
                    Mobile: res[0].mobile,
                    PasswordHash: res[0].passwordHash,
                    CreatedAt: res[0].createdAt,
                    ModifiedAt: res[0].modifiedAt
                }));
            });

    }, [])

    const validateField = (name, value) => {
        switch (name) {
            case "UserId":
                return value ? "" : "User Id is required.";
            case 'Name':
                return value.trim() ? '' : 'Name is required';
            case 'Email':
                return value.trim() ? (/\S+@\S+\.\S+/.test(value) ? '' : 'Email is invalid') : 'Email is required';
            case 'Mobile':
                return value.trim() ? (/^\d{10}$/.test(value) ? '' : 'Mobile number is invalid (only 10 digits required)') : 'Mobile number is required';
            case 'PasswordHash':
                return value ? (value.length >= 6 ? '' : 'Password must be at least 6 characters long') : 'Password is required';
            default:
                return '';

        }
    }

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
            }))
        }
    }

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
    }

    const handleSubmit = async (e) => {
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
            console.log("Form Data",formData)
            const {CreatedAt,ModifiedAt,...rest} = formData;
            console.log("Sent Data",rest)


            const response = await fetch(apiUrl + "Users/UpdateUsers/" + loggedInUser.userId, {
                body: JSON.stringify(formData),
                headers: { "Content-Type": "application/json", Authorization: authorizationToken, },
                method: "PUT",
            });

            const responseData = await response.json();

            if (response.ok) {
                storeUserInLS({ userId: formData.UserId, name: formData.Name, email: formData.Email, mobile: formData.Mobile, passwordHash: formData.PasswordHash, createdAt: formData.CreatedAt, modifiedAt: formData.ModifiedAt })
                toast.warning(responseData.message)
                navigate("/user")
            }
        }
    };

    const handleReset = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            UserId: loggedInUser.userId,
            Name: "",
            Email: "",
            Mobile: "",
            PasswordHash: "",
            CreatedAt: "",
            ModifiedAt: ""
        }));
        setTouched({
            UserId: false,
            Name: false,
            Email: false,
            Mobile: false,
            PasswordHash: false
        });
        setErrors({
            UserId: "",
            Name: "",
            Email: "",
            Mobile: "",
            PasswordHash: "",
        });
    };


    return (
        <div className="container my-5">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">Update User Profile</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* UserId Dropdown */}
                            <div className="mb-3 col-4">
                                <label htmlFor="UserId" className="form-label">
                                    <strong>UserId:</strong>
                                </label>
                                <input
                                    type="text"
                                    id="UserId"
                                    name="UserId"
                                    style={{
                                        WebkitAppearance: "none",
                                        MozAppearance: "none",
                                        appearance: "none",
                                        background: "lightgray",
                                        paddingRight: "20px",
                                    }}
                                    value={formData.UserId}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.UserId ? "is-invalid" : ""}`}
                                    required
                                />
                                {errors.UserId && <div className="invalid-feedback">{errors.UserId}</div>}
                            </div>

                            {/* User Name Input */}
                            <div className="mb-3 col">
                                <label htmlFor="Name" className="form-label">
                                    <strong>User Name:</strong>
                                </label>
                                <input
                                    type="text"
                                    id="Name"
                                    name="Name"
                                    value={formData.Name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.Name ? "is-invalid" : ""}`}
                                    placeholder="Enter Category Name"
                                    required
                                />
                                {errors.Name && (<div className="invalid-feedback">{errors.Name}</div>)}

                            </div>
                        </div>

                        <div className="row">
                            {/* Email Input */}
                            <div className="mb-3 col">
                                <label htmlFor="Email" className="form-label">
                                    <strong>Email:</strong>
                                </label>
                                <input
                                    type="text"
                                    id="Email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.Email ? "is-invalid" : ""}`}
                                    placeholder="Enter Category Name"
                                    required
                                />
                                {errors.Email && (<div className="invalid-feedback">{errors.Email}</div>)}

                            </div>

                            {/* Mobile Input */}
                            <div className="mb-3 col">
                                <label htmlFor="Mobile" className="form-label">
                                    <strong>Mobile:</strong>
                                </label>
                                <input
                                    type="text"
                                    id="Mobile"
                                    name="Mobile"
                                    value={formData.Mobile}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.Mobile ? "is-invalid" : ""}`}
                                    placeholder="Enter Category Name"
                                    required
                                />
                                {errors.Mobile && (<div className="invalid-feedback">{errors.Mobile}</div>)}

                            </div>

                            {/* PasswordHash Input */}
                            <div className="mb-3 col">
                                <label htmlFor="PasswordHash" className="form-label">
                                    <strong>Password:</strong>
                                </label>
                                <input
                                    type="text"
                                    id="PasswordHash"
                                    name="PasswordHash"
                                    value={formData.PasswordHash}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={`form-control ${errors.PasswordHash ? "is-invalid" : ""}`}
                                    placeholder="Enter Category Name"
                                    required
                                />
                                {errors.PasswordHash && (<div className="invalid-feedback">{errors.PasswordHash}</div>)}

                            </div>

                        </div>

                        {/* Buttons */}
                        <button type="submit" className="btn btn-warning">
                            Update
                        </button>
                        <button type="button" onClick={handleReset} className="ms-3 btn btn-secondary">
                            Reset
                        </button>
                        <button type="button" onClick={() => { navigate(-1) }} className="ms-3 btn btn-info">
                            Back
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditUser