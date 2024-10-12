import React, { useState } from "react";
import { Input, Button, Form, notification } from "antd";
import { useDispatch } from "react-redux";
import { register } from "../../Redux/User/userSlice"; // Import action register từ slice

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Xử lý khi form được submit
  const onFinish = async (values) => {
    // Dispatch action register và truyền dữ liệu form
    const resultAction = await dispatch(register(values));

    // Kiểm tra kết quả
    if (register.fulfilled.match(resultAction)) {
      notification.success({
        message: "Đăng ký thành công",
        description: "Tài khoản của bạn đã được tạo thành công!",
      });
    } else {
      notification.error({
        message: "Đăng ký thất bại",
        description: resultAction.payload || "Có lỗi xảy ra khi đăng ký.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-400 to-green-400">
      <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>
        <Form name="signup" onFinish={onFinish} layout="vertical">
          {/* Họ và tên (cần thay đổi từ fullname sang name) */}
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Nhập họ và tên" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
            />
          </Form.Item>

          {/* Xác nhận mật khẩu */}
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            rules={[
              { required: true, message: "Please confirm your password!" },
            ]}
          >
            <Input.Password
              placeholder="Confirm your password"
              type={showPassword ? "text" : "password"}
            />
          </Form.Item>

          {/* Nút đăng ký */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 text-lg bg-teal-500 hover:bg-teal-600 text-white"
            >
              Sign Up
            </Button>
          </Form.Item>
        </Form>

        {/* Link tới trang đăng nhập */}
        <div className="text-center mt-4">
          <span className="text-sm">Already have an account? </span>
          <a href="/login" className="text-sm text-teal-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
