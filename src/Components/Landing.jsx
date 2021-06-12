import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"


export const Landing = () => {
    const navigate = useNavigate();
    const currentUser = useSelector(state => state.auth);
    useEffect(() => {
        if(currentUser.token){
            navigate("/home");
        }
    },[currentUser]);

    return(
        <>
       <button>Login</button>
        </>
    )
}