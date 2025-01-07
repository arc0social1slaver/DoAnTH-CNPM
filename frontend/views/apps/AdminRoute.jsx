import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = ({children}) => {
    const token = localStorage.getItem('token')
    if(!token) {
        const user = sessionStorage.getItem('user');
        if(user) {
            return <Navigate to='/user'/>;
        }
        return <Navigate to='/' replace/>
    }
    return children;
}
export default AdminRoute;