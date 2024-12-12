/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
import Topbar from "../components/admin/Topbar";
import SideBar from "../components/admin/Sidebar";


import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div>
      <div className="flex">
        <div className="w-20 md:w-1/6 h-screen">
          <SideBar />
        </div>
        <div className="md:w-5/6 flex flex-col h-screen" style={{ width: "calc(100% - 5rem)" }}>
          <Topbar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
