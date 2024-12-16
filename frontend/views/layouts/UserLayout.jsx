import Footer from '../components/Footer';
import ChatApp from '../components/user/Chat';
import Navbar from '../components/user/Navbar';
import { Outlet } from "react-router-dom";
import { AuthProvide } from '../context/AuthContext';

const UserLayout = () => {
    return (
        <AuthProvide>
            <Navbar />
            <div>
                <Outlet />
                <ChatApp />
            </div>
            <Footer />
        </AuthProvide>
    );
}

export default UserLayout;

