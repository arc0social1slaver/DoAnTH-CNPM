import Footer from '../components/Footer';
import ChatApp from '../components/user/Chat';
import Navbar from '../components/user/Navbar';
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
                <ChatApp />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;

