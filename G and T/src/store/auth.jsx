import { createContext, useContext, useState } from "react";


export const AuthContext = createContext();

export const AuthProvider = ({ children }) =>{

     const [token,setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLocalStorage = (serverToken)=>{
        return localStorage.setItem("token",serverToken);
    };

    let isLoggedIn = !! token;

    const LogOutUser = ()=>{
        setToken("");
        localStorage.removeItem("token");
    }

    return(
        <AuthContext.Provider value={{isLoggedIn,storeTokenInLocalStorage,LogOutUser}}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth=() =>{
    const authContextValue  = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the Provider");
    }
    return authContextValue;
};  
