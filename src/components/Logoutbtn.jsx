import {useDispatch } from "react-redux"
import authService from "../appwrite/auth.js"
import { logout } from "../utils/authSlice.js";

const Logoutbtn = ()=>{
    const dispatch = useDispatch();
    const logoutHandler = ()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout());//to keep the store updated
        })
        .catch((error)=>{
            console.log(`error occured in logoutbth: ${error}`);
        })
    }
    return (
        <button className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={()=>logoutHandler()}>Logout</button>
    )
}

export default Logoutbtn;