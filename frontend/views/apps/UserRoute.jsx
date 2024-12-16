import { Navigate } from "react-router-dom";
import {useAuth} from "../context/AuthContext";

const UserRoute = ({children}) => {
    const currUser = sessionStorage.getItem('user')
    if(localStorage.getItem('token')) {
        return <Navigate to="/admin"/>;
    }
    if(currUser) {
        return children;
    }
    return <Navigate to="/"/>
}
export default UserRoute;