import React, { useEffect } from "react";
import jwtDecode from "jwt-decode"
import { Outlet, useNavigate } from "react-router-dom";
import HomePage from "../pages/HomePage";

const auth = ()=> {
    return JSON.parse(localStorage.getItem("userLoggedIn"));
}

export const useSession = ()=> {
    const session = auth();
    const decodedSession = session ? jwtDecode(session) : null;

    const navigate = useNavigate();
        
    useEffect(()=>{
        /* if(!session){
            navigate("/", {replace: true})
        }; */
    },[navigate, session]);

    return decodedSession;
}

const ProtectedRoutes = ()=>{
    const isAutorized = auth()
    const session = useSession()

    return isAutorized ? <Outlet/> : <HomePage/>;
};

export default ProtectedRoutes;
