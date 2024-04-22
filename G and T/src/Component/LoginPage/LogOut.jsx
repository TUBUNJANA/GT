import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../store/auth';
import { toast } from 'react-toastify';
import {useAppContext} from "../../App.jsx";

function LogOut() {
    const {isTokenAvailFuntion} = useAppContext();
    const {LogOutUser} = useAuth();
    useEffect(()=>{
        LogOutUser();
        isTokenAvailFuntion();
        toast.success("Log out successfull");

    },[LogOutUser]);

    return (<Navigate to="/loginPage2"/>)
}

export default LogOut
