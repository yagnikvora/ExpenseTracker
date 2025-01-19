import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"
import { toast } from "react-toastify";
import { useState } from "react";

const Users = () => {
    const {isLoggedIn} = useAuth();
    const toastId = "login-toast";
    const [logedInUser, setLogedInUser] = useState(JSON.parse(localStorage.getItem('userData')));
    
    if(!isLoggedIn){
        if (!toast.isActive(toastId)) {
            toast.error("Please Login First", { toastId });
          }
        return <Navigate to="/" />
    }
    else{
        return (
            <h3>Hello {JSON.stringify(logedInUser)}</h3>
        )
    }
}

export default Users