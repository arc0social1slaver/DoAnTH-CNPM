/**
 * @description Layout
 * Layout lấy các file từ component và ghép lại với nhau để tạo thành layout hoàn chỉnh chung cho các trang khác nhau
 */
import { useState } from "react";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";

import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSBActive, setSBActive] = useState(false);
  const changeSB = () => {
    setSBActive(state => !state)
  }
  return (
    <div className={`${isSBActive ? 'pl-0' : 'pl-[30rem]'}`}>
      <Navbar changeSB={changeSB}/>
      <Sidebar isSBActive={isSBActive} changeSB={changeSB}/>

      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
