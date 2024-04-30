import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { Flip, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookie from "js-cookie";

import LoginPage from "./pages/auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import Loader from "./components/Loader";
import RegisterPage from "./pages/auth/RegisterPage";
import MyProfilePage from "./pages/MyProfilePage";
import CustomerHome from "./pages/customer/Home";
import AdminHome from "./pages/admin/Home";

export default function App() {
  return (
    <div>
      <Routes>
        <Route index path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/*" element={<CustomerHome />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/profile" element={<MyProfilePage />} />
        </Route>

        {/* Not Found */}
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>

      <ToastContainer
        position="bottom-left"
        transition={Flip}
        autoClose={2500}
        hideProgressBar
        theme="colored"
      />
      <Loader />
    </div>
  );
}

function ProtectedRoute() {
  const token = Cookie.get("access_token") && Cookie.get("refresh_token");

  return token ? <Outlet /> : <Navigate to="/" />;
}
