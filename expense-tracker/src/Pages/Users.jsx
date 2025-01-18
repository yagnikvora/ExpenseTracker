import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth"

const Users = () => {
    const {isLoggedIn} = useAuth();
    console.log(isLoggedIn)
    if(!isLoggedIn){
        return <Navigate to="/" />
    }
    else{
        return (
            <h1>Hello</h1>
        )
    }
}

export default Users