/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
// import { useState } from "react";
// import Navbar from "../components/admin/Navbar";
// import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";
import SideBar from "../components/admin/Sidebar";


import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSBActive, setSBActive] = useState(false);
  const changeSB = () => {
    setSBActive(state => !state)
  }
  return (
    // <div className={`${isSBActive ? 'pl-0' : 'pl-[30rem]'}`}>
    //   <Navbar changeSB={changeSB}/>
    //   <Sidebar isSBActive={isSBActive} changeSB={changeSB}/>

    //   <div>
    //     <Outlet />
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
