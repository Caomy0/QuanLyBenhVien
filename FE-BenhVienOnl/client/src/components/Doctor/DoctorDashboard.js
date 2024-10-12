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
const DoctorDashboard = () => {
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
              to="/doctorDashboard/doctorSchedule"
              className="text-sm text-teal-600 hover:underline"
            >
              Quản Lý Lịch Làm Việc
            </Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="" className="text-sm text-teal-600 hover:underline">
              Quản Lý Lịch Khám
            </Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="" className="text-sm text-teal-600 hover:underline">
              Quản Lý Bệnh Nhân
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

export default DoctorDashboard;
