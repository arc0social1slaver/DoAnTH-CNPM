import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LogOrReg from "../pages/LogOrReg";
import Login from '../pages/Login';
import Register from '../pages/Register';
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import UserDashboard from "../user/Dashboard";
import Fashion from "../user/Fashion";
import Beauty from "../user/Beauty";
import Documents from "../user/Documents";
import Electronics from "../user/Electronics";
import ProductDetail from "../user/ProductDetail";

import AdminDashboard from "../admin/Dashboard";
import AdminOrders from "../admin/Orders";
import AdminProducts from "../admin/Products";
import AdminSetting from "../admin/Setting";
import AdminUsers from "../admin/Users";

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
          <Route path="/login-or-register" element={<LogOrReg/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Route>
      </Routes>

      {/* For Admin */}
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/setting" element={<AdminSetting />} />
        </Route>
      </Routes>
     
      {/* For User */}
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="fashion" element={<Fashion/>} /> 
          <Route path="beauty" element={<Beauty/>} /> 
          <Route path="documents" element={<Documents/>} /> 
          <Route path="electronics" element={<Electronics/>} /> 
          <Route path="product/:id" element={<ProductDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
