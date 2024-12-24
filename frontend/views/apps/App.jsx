import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "../pages/Loading";
import Home from "../pages/Home";
import LogOrReg from "../pages/LogOrReg";
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
import ShowCart from "../user/ShowCart";

import AdminDashboard from "../admin/dashboard/Dashboard";
import AdminOrders from "../admin/orders/Orders";
import AdminUsers from "../admin/users/Users";
import AdminProducts from "../admin/products/Products";
import AdminSetting from "../admin/Setting";
import UserRoute from "./UserRoute";
import { useAuth } from "../context/AuthContext";
import AdminRoute from "./AdminRoute";
import AdminCategories from "../admin/categories/Categories";

const App = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
      <BrowserRouter>  
        <Routes>
          <Route path="/" element={isLoading ? <Loading /> : <DefaultLayout />}>
            <Route index element={<Home />} />
            <Route path="/login-or-register" element={<LogOrReg/>} />
            <Route path="/register" element={<Register/>} />
          </Route>
        </Routes>

      {/* For Admin */}
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          <Route path="dashboard" element={<AdminDashboard />} /> 
          <Route path="users" element={<AdminUsers />} /> 
          <Route path="orders" element={<AdminOrders />} /> 
          <Route path="products" element={<AdminProducts />} /> 
          <Route path="categories" element={<AdminCategories/>} /> 
          <Route path="setting" element={<AdminSetting />} /> 
        </Route>
      </Routes>
     
      {/* For User */}
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserRoute><UserDashboard /></UserRoute>} />
          <Route path="cart" element={<ShowCart/>} />
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
