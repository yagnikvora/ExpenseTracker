import { Children, createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [userData,setUserdata] = useState()
    const authorizationToken = `Bearer ${token}`;

    const storeTokenInLS = (serverToken) => {
        localStorage.setItem('token', serverToken);
        setToken(localStorage.getItem('token'));
    }

    const storeUserInLS = (user) => {
        localStorage.setItem('userData' , JSON.stringify(user));
        setUserdata(user);
    }

    let isLoggedIn = token ? true : false;


    const logoutUser = () => {
        setToken("");
        localStorage.removeItem('userData');
        return localStorage.removeItem('token');
    }

    return(
        <AuthContext.Provider value={{storeTokenInLS , storeUserInLS , authorizationToken , userData, isLoggedIn , logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth must be within an AuthProvider")
    }

    return authContextValue;
}