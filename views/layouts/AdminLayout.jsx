/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
