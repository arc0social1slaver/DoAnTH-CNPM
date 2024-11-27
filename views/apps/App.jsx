import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from '../pages/Login';
import Register from '../pages/Register';
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
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
    </BrowserRouter>
  );
};

export default App;
