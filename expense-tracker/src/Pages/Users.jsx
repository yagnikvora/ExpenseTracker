import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaMobile, FaCalendarAlt, FaClock, FaCrown   } from "react-icons/fa"
import { useState } from "react";
import "./css/user.css"

const Users = () => {
    const { isLoggedIn } = useAuth();
    const toastId = "login-toast";
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')));


    const formatDate = (dateString) => {
        const date = new Date(dateString)
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        })
    }
    if (!isLoggedIn) {
        if (!toast.isActive(toastId)) {
            toast.error("Please Login First", { toastId });
        }
        return <Navigate to="/" />
    }
    else {
        return (
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-lg">
                            <div className="card-header bg-primary text-center py-3">
                                <h2 className="mb-0 text-white">User Profile</h2>
                            </div>
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <div className="avatar-circle">
                                        <span className="avatar-text">{userData.name.charAt(0).toUpperCase()}</span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaUser className="icon" />
                                            <div>
                                                <h5 className="mb-0">Name</h5>
                                                <p>{userData.name}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaEnvelope className="icon" />
                                            <div>
                                                <h5 className="mb-0">Email</h5>
                                                <p>{userData.email}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaMobile className="icon" />
                                            <div>
                                                <h5 className="mb-0">Mobile</h5>
                                                <p>{userData.mobile}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaCalendarAlt className="icon" />
                                            <div>
                                                <h5 className="mb-0">Created At</h5>
                                                <p>{formatDate(userData.createdAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaClock className="icon" />
                                            <div>
                                                <h5 className="mb-0">Last Modified</h5>
                                                <p>{formatDate(userData.modifiedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <div className="info-item">
                                            <FaCrown   className="icon" />
                                            <div>
                                                <h5 className="mb-0">Head Of Family</h5>
                                                <p>{userData.hofName}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="info-item">
                                            <div>
                                                <Link to="/user/edituser" className="mb-0 btn btn-primary">Update Profile</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Users