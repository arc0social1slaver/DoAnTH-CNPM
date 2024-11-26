import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import AdminLayout from "../layouts/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Home />} />
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
