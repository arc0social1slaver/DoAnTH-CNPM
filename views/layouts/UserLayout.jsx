import Footer from '../components/Footer';
import Navbar from '../components/user/Navbar';
import { Outlet } from "react-router-dom";

const UserLayout = () => {
    return (
        <div>
            <Navbar />
            <div>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
}

export default UserLayout;

