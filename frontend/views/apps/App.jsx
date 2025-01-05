import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Loading from "../pages/Loading";
import Home from "../pages/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import UserDashboard from "../user/Dashboard";
import UserProfile from "../user/UserProfile";
import OrderManagement from "../user/OrderManagement";
import PurchaseHistory from "../user/PurchaseHistory";
import MyStore from "../user/MyStore";
import Fashion from "../user/Fashion";
import Beauty from "../user/Beauty";
import Documents from "../user/Documents";
import Electronics from "../user/Electronics";
import ProductDetail from "../user/ProductDetail";

import AdminDashboard from "../admin/dashboard/Dashboard";
import AdminUsers from "../admin/users/Users";
import AdminProducts from "../admin/products/ProductsLayout";

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
          </Route>
        </Routes>

      {/* For Admin */}
      <Routes>
        <Route path="/admin" element={isLoading ? <Loading /> : <AdminLayout />}>
          <Route index element={isLoading ? <Loading /> : <AdminDashboard />} />
          <Route path="dashboard" element={isLoading ? <Loading /> : <AdminDashboard />} /> 
          <Route path="users" element={isLoading ? <Loading /> : <AdminUsers />} /> 
          <Route path="products" element={isLoading ? <Loading /> : <AdminProducts />} /> 
        </Route>
      </Routes>
     
      {/* For User */}
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
          <Route path="profile" element={<UserProfile/>} />
          <Route path="sale" element={<OrderManagement/>} />
          <Route path="order" element={<PurchaseHistory/>} />
          <Route path="my-store" element={<MyStore/>} />
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
