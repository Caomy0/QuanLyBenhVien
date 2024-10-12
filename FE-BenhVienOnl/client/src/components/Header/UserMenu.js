import React from "react";
import { Menu, Dropdown, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { clearError, logout } from "../../Redux/User/userSlice"; // Import action logout
import { useNavigate } from "react-router-dom"; // Import useNavigate để điều hướng

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng
  const { user } = useSelector((state) => state.user); // Lấy thông tin người dùng từ Redux store

  const handleLogout = () => {
    dispatch(clearError()); // Xóa lỗi nếu có trước khi đăng xuất
    dispatch(logout()); // Dispatch action logout
    navigate("/"); // Điều hướng tới trang đăng nhập sau khi đăng xuất
  };

  const loggedInMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/profile" className="text-gray-700 hover:text-blue-500">
          Thông tin tài khoản
        </a>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        <a href="/" className="text-gray-700 hover:text-blue-500">
          Đăng xuất
        </a>
      </Menu.Item>
    </Menu>
  );

  const loggedOutMenu = (
    <Menu>
      <Menu.Item key="1">
        <a href="/login" className="text-gray-700 hover:text-blue-500">
          Đăng Nhập
        </a>
      </Menu.Item>
      <Menu.Item key="2">
        <a href="/signup" className="text-gray-700 hover:text-blue-500">
          Đăng Ký
        </a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex items-center">
      <Dropdown
        overlay={user ? loggedInMenu : loggedOutMenu} // Sử dụng thông tin người dùng từ Redux
        placement="bottomRight"
        arrow
      >
        <Avatar
          size="large"
          icon={<UserOutlined />}
          className="cursor-pointer"
        />
      </Dropdown>
      {/* Hiển thị tên người dùng nếu đã đăng nhập */}
      {user && (
        <span className="ml-2 text-red-200 bold">
          {user.name} {/* Render tên người dùng */}
        </span>
      )}
    </div>
  );
};

export default UserMenu;
