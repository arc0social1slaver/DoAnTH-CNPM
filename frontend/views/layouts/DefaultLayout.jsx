/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
import Header from "../components/Header";
//import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import { AuthProvide } from "../context/AuthContext";

const DefaultLayout = () => {
  return (
    <AuthProvide>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </AuthProvide>
  );
};

export default DefaultLayout;
