import React from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Link, Outlet } from "react-router-dom";
import logo from "../../img/logo192.png";
import UserMenu from "../Header/UserMenu";

const { Header, Sider, Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider trigger={null} collapsible className="bg-white" width={250}>
        <div className="logo p-4 text-center">
          <img src={logo} alt="logo" className="h-12 mx-auto" />
        </div>
        <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link
              to="/adminDashboard"
              className="text-sm text-teal-600 hover:underline"
            >
              Bảng Điều Khiển
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<UserOutlined />}>
            <Link
              to="/adminDashboard/user"
              className="text-sm text-teal-600 hover:underline"
            >
              Quản Lý Người Dùng
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<VideoCameraOutlined />}>
            <Link
              to="/adminDashboard/doctor"
              className="text-sm text-teal-600 hover:underline"
            >
              Quản Lý Bác Sĩ
            </Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            Quản Lý Ca Khám Bệnh
          </Menu.Item>
          <Menu.Item key="5" icon={<UploadOutlined />}>
            <Link
              to="/adminDashboard/department"
              className="text-sm text-teal-600 hover:underline"
            >
              Quản Lý Chuyên Khoa
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>

      {/* Main content */}
      <Layout className="site-layout">
        <UserMenu />

        <Content className="p-8 bg-gray-100">
          {/* Phần nội dung sẽ thay đổi tại đây dựa vào các Route con */}
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
