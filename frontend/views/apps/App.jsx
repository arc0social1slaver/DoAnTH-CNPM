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
import ProductDetail from "../user/ProductDetail";
import ShowCart from "../user/ShowCart";
import Checkout from "../user/Checkout";

import AdminDashboard from "../admin/dashboard/Dashboard";
import AdminUsers from "../admin/users/Users";
import AdminProducts from "../admin/products/ProductsLayout";
import UserRoute from "./UserRoute";
import AdminRoute from "./AdminRoute";
import ShowProducts from "../user/ShowProducts";

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
        <Route path="/admin" element={isLoading ? <Loading /> : <AdminRoute><AdminLayout /></AdminRoute>}>
          <Route index element={isLoading ? <Loading /> : <AdminDashboard />} />
          <Route path="dashboard" element={isLoading ? <Loading /> : <AdminDashboard />} /> 
          <Route path="users" element={isLoading ? <Loading /> : <AdminUsers />} /> 
          <Route path="products" element={isLoading ? <Loading /> : <AdminProducts />} /> 
        </Route>
      </Routes>
     
      {/* For User */}
      <Routes>
        <Route path="/user" element={isLoading ? <Loading /> : <UserRoute><UserLayout /></UserRoute>}>
          <Route index element={isLoading ? <Loading /> :<UserDashboard />} />
          <Route path="cart" element={isLoading ? <Loading /> :<ShowCart/>} />
          <Route path="profile" element={isLoading ? <Loading /> :<UserProfile/>} />
          <Route path="sale" element={isLoading ? <Loading /> :<OrderManagement/>} />
          <Route path="order" element={isLoading ? <Loading /> :<PurchaseHistory/>} />
          <Route path="product" element={isLoading ? <Loading /> :<MyStore/>} />
          <Route path="product/cat/:id" element={isLoading ? <Loading /> :<ShowProducts/>} />
          <Route path="product/:id" element={isLoading ? <Loading /> :<ProductDetail />} />
          <Route path="checkout" element={isLoading ? <Loading /> :<Checkout/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
