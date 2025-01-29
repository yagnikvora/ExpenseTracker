import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const apiUrl = "http://localhost:5000/api/";

const AddEditCategory = () => {
    const {cid} = useParams();
    const navigate = useNavigate();

    const {isLoggendIn , authorizationToken } = useAuth();
    const [users, setUsers] = useState([]);

    const [loggedInUser, setLoggedInUser] =  useState(JSON.parse(localStorage.getItem("userData")));

    const [formData , setFormData] = useState({
        CategoryId : "",
        CategoryName : "",
        UserId : loggedInUser.userId,
        CategoryType : "",
        CategoryDescription:"",
    })

    const [touched , setTouched ] = useState({
        CategoryName : false,
        UserId :false,
        CategoryType :false,
        CategoryDescription:false,
    })

    const [errors  , setErrors] = useState({
        CategoryName : "",
        UserId : "",
        CategoryType : "",
        CategoryDescription:"",
    })

    const validateField = (name,value) => {
        switch(name){
            case "UserId" :
                return value ? "" : "User name is required.";
            case "CategoryName" :
                return value ? "" : "Category name is required.";
            case "CategoryType":
                return value ? "" : "Categoty type is required.";
            case "CategoryDescription":
                return value ? "" : "Categoty Description is required.";
        default:
            return "";

        }
    }

    useEffect(() => {
        if(cid){
            fetch(apiUrl + "Categories/GetAllCategoriesByID/" + cid ,{
                method: "GET",
                headers : {
                    Authorization: authorizationToken,
                }
            })
            .then((res) => res.json())
            .then((res) => {
                setFormData({
                    CategoryId : res[0].categoryId,
                    CategoryName : res[0].categoryName,
                    UserId : res[0].userId,
                    CategoryType : res[0].categoryType,
                    CategoryDescription:res[0].categoryDescription,
                })
            })
        }

        fetch(apiUrl + "Users/UsersDropdown", {
            method: "GET",
            headers: {
                Authorization: authorizationToken,
            },
        })
            .then((response) => response.json())
            .then((data) => setUsers(data));

    },[cid])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        if(touched[name]){
            setErrors((prevErrors)=>({
                ...prevErrors,
                [name] : validateField(name,value),
            }))
        }
    }

    const handleBlur = (e) =>{
        const  {name,value} = e.target;
        setTouched((prevTouched) => ({
            ...prevTouched,
            [name]:true,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]:validateField(name,value),
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
            if (cid) {
                const response = await fetch(apiUrl + "Categories/UpdateCategories/" + cid, {
                    body: JSON.stringify(formData),
                    headers: { "Content-Type": "application/json", Authorization: authorizationToken, },
                    method: "PUT",
                });

                const responseData = await response.json();

                if (response.ok) {
                    toast.warning(responseData.message)
                    navigate("/categories")
                }
            } else {
                const { CategoryId, ...rest } = formData;
                const response = await fetch(apiUrl + "Categories/InsertCategories/", {
                    body: JSON.stringify(rest),
                    headers: { "Content-Type": "application/json", Authorization: authorizationToken, },
                    method: "POST",
                });

                const responseData = await response.json();

                if (response.ok) {
                    toast.success(responseData.message)
                    // navigate("/categories")
                    navigate("/budgets/addeditbudget")
                }
            }
        }
    };

    const handleReset = () => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            CategoryName : "",
            UserId : loggedInUser.userId,
            CategoryType : "",
            CategoryDescription:"",
        }));
        setTouched({
            CategoryName : false,
            UserId :false,
            CategoryType :false,
            CategoryDescription:false,
        });
        setErrors({
            CategoryName : "",
            UserId : "",
            CategoryType : "",
            CategoryDescription:"",
        });
    };

    
    return(
        <div className="container my-5">
        <div className="card">
            <div className="card-header bg-primary text-white">
                <h3 className="mb-0">{cid > 0 ? "Edit" : "Add"} Category</h3>
            </div>
            <div className="card-body">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Username Dropdown */}
                        <div className="mb-3 col">
                            <label htmlFor="UserId" className="form-label">
                                <strong>Username:</strong>
                            </label>
                            <select
                                id="UserId"
                                name="UserId"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formData.UserId}
                                style={{
                                    WebkitAppearance: "none",
                                    MozAppearance: "none",
                                    appearance: "none",
                                    background: "lightgray",
                                    paddingRight: "20px",
                                }}
                                className={`form-select ${errors.UserId ? "is-invalid" : ""}`}
                                disabled
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

                        {/* Category Name Input */}
                        <div className="mb-3 col">
                            <label htmlFor="CategoryName" className="form-label">
                                <strong>Category Name:</strong>
                            </label>
                            <input
                                type="text"
                                id="CategoryName"
                                name="CategoryName"
                                value={formData.CategoryName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.CategoryName ? "is-invalid" : ""}`}
                                placeholder="Enter Category Name"
                                required
                            />
                            {errors.CategoryName && (<div className="invalid-feedback">{errors.CategoryName}</div>)}

                        </div>
                    </div>

                    <div className="row">
                        {/* CategoryType Input */}
                        <div className="mb-3 col">
                            <label htmlFor="CategoryType" className="form-label">
                                <strong>Category Type:</strong>
                            </label>
                            <select
                                id="CategoryType"
                                name="CategoryType"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={formData.CategoryType}
                                className={`form-select ${errors.CategoryType ? "is-invalid" : ""}`}
                            >
                                <option value="" disabled>Select Category type</option>
                                <option value="Income" >Income</option>
                                <option value="Expense" >Expense</option>
                            </select>
                            {errors.CategoryType && (<div className="invalid-feedback">{errors.CategoryType}</div>)}

                        </div>

                         {/* CategoryDescription Textarea */}
                         <div className="mb-3 col">
                            <label htmlFor="CategoryDescription" className="form-label">
                                <strong>Category Description:</strong>
                            </label>
                            <textarea
                                id="CategoryDescription"
                                name="CategoryDescription"
                                value={formData.CategoryDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`form-control ${errors.CategoryDescription ? "is-invalid" : ""}`}
                                rows="3"
                                placeholder="Add Category Description"
                            />
                            {errors.CategoryDescription && (<div className="invalid-feedback">{errors.CategoryDescription}</div>)}

                        </div>
                    </div>

                    {/* Buttons */}
                    <button type="submit" className={cid > 0 ? "btn btn-warning" : "btn btn-primary"}>
                        {cid > 0 ? "Update" : "Submit"}
                    </button>
                    <button type="button" onClick={handleReset} className="ms-3 btn btn-secondary">
                        Reset
                    </button>
                </form>
            </div>
        </div>
    </div>
    )
}
export default AddEditCategory