import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import LogOrReg from "../pages/LogOrReg";
import Login from '../pages/Login';
import Register from '../pages/Register';
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
//import Dashboard from "../admin/Dashboard";
import UserDashboard from "../user/Dashboard";
import Fashion from "../user/Fashion";
import Beauty from "../user/Beauty";
import Documents from "../user/Documents";
import Electronics from "../user/Electronics";
import ProductDetail from "../user/ProductDetail";
import ShowCart from "../user/ShowCart";

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
          <Route index element={<Home />} />
        </Route>
      </Routes>
     
      {/* For User */}
      <Routes>
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<UserDashboard />} />
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
