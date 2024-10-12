import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { login, clearError } from "../../Redux/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, error, loading } = useSelector((state) => state.user);
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then((response) => {});
  };
  useEffect(() => {
    if (error) {
      alert(error); // Hiển thị lỗi nếu có
      dispatch(clearError()); // Xóa lỗi sau khi hiển thị
    }

    if (user) {
      navigate("/"); // Điều hướng đến trang home nếu đăng nhập thành công
    }
  }, [error, user, dispatch, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-green-400">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showPassword"
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)}
              className="mr-2"
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 transition duration-300"
          >
            SIGN IN
          </button>
        </form>
        <div className="text-center mt-4">
          <a
            href="/forgot-password"
            className="text-sm text-teal-600 hover:underline"
          >
            Forgot Username / Password?
          </a>
        </div>
        <div className="text-center mt-2">
          <span className="text-sm">Don't have an account? </span>
          <a href="/signup" className="text-sm text-teal-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
