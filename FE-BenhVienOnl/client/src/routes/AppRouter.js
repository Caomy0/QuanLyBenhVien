import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login/Login";
import Home from "../pages/Home";
import Profile from "../components/Login/Profile";
import SignUp from "../components/Login/SignUp";
import AdminDashboard from "../components/Admin/AdminDashboard";
import User from "../components/Admin/User";
import Doctor from "../components/Admin/Doctor";
import Department from "../components/Admin/Department";
import { useDispatch } from "react-redux";
import { setUser } from "../Redux/User/userSlice"; // Import action setUser
import DoctorDashboard from "../components/Doctor//DoctorDashboard";
import DoctorSchedule from "../components/Doctor/DoctorSchedule";

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Kiểm tra nếu token tồn tại trong localStorage
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // Nếu có token và thông tin người dùng, cập nhật lại Redux state
    if (token && user) {
      dispatch(setUser({ user, token })); // Dispatch cả user và token
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminDashboard/*" element={<AdminDashboard />}>
          <Route path="user" element={<User />} />
          <Route path="doctor" element={<Doctor />} />
          <Route path="department" element={<Department />} />
        </Route>
        <Route path="/doctorDashboard/*" element={<DoctorDashboard />}>
          <Route path="doctorSchedule" element={<DoctorSchedule />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRouter;
