import React, { useEffect, useState } from "react";
import { Input, Select, Button, Table, Tag, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, searchUsers } from "../../Redux/User/userSlice"; // Import hành động fetchUsers và searchUsers

const { Option } = Select;

const User = () => {
  const dispatch = useDispatch();

  // Lấy danh sách người dùng và trạng thái từ Redux
  const { users, error, loading } = useSelector((state) => state.user);

  // State để lưu các giá trị tìm kiếm
  const [searchParams, setSearchParams] = useState({
    email: "",
    name: "",
    phone: "",
    address: "",
    degree: "",
  });

  // Gọi API lấy danh sách người dùng khi component được render
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Hàm cập nhật giá trị tìm kiếm
  const handleInputChange = (key, value) => {
    setSearchParams({
      ...searchParams,
      [key]: value,
    });
  };

  // Hàm tìm kiếm khi nhấn nút "Ứng dụng"
  const handleSearch = () => {
    const params = {};

    // Lọc các giá trị không undefined hoặc trống
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] && searchParams[key] !== "undefined") {
        params[key] = searchParams[key];
      }
    });

    console.log("Search Params:", params); // Kiểm tra các giá trị đã lọc
    dispatch(searchUsers(params)); // Gọi action searchUsers với các tham số đã lọc
  };

  // Cột của bảng dữ liệu
  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "doctor" ? "blue" : "yellow"}>{role}</Tag>
      ),
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Hoạt động" ? "green" : "volcano"}>{status}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link" icon={<i className="fas fa-edit"></i>} />
          <Button
            type="link"
            danger
            icon={<i className="fas fa-trash-alt"></i>}
          />
        </Space>
      ),
    },
  ];

  // Hiển thị khi đang tải hoặc có lỗi
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        QUẢN LÝ NGƯỜI DÙNG
      </h2>

      {/* Bộ lọc */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Input
          placeholder="Email"
          value={searchParams.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
        />
        <Input
          placeholder="Tên"
          value={searchParams.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <Select
          placeholder="Giới tính"
          value={searchParams.gender}
          onChange={(value) => handleInputChange("gender", value)}
        >
          <Option value="Nam">Nam</Option>
          <Option value="Nữ">Nữ</Option>
        </Select>
        <Input
          placeholder="Địa chỉ"
          value={searchParams.address}
          onChange={(e) => handleInputChange("address", e.target.value)}
        />
        <Select
          placeholder="Vai trò"
          value={searchParams.role}
          onChange={(value) => handleInputChange("role", value)}
        >
          <Option value="doctor">Bác sĩ</Option>
          <Option value="patient">Bệnh nhân</Option>
        </Select>

        <div className="col-span-3 flex justify-start">
          <Button type="primary" className="mr-2" onClick={handleSearch}>
            Ứng dụng
          </Button>
          <Button onClick={() => setSearchParams({})}>Cài lại</Button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <Table
        columns={columns}
        dataSource={users}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
};

export default User;
