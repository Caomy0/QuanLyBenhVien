import React from "react";
import { Input, Button, Table, Space } from "antd";

const Department = () => {
  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (text) => (
        <img src={text} alt="department" className="h-12 w-12" />
      ),
    },
    {
      title: "Tên chuyên khoa",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
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

  const data = [
    {
      key: "1",
      id: "1",
      image: "/images/acupuncture.png",
      name: "Châm cứu",
    },
    {
      key: "2",
      id: "2",
      image: "/images/traditional.png",
      name: "Y học Cổ truyền",
    },
    {
      key: "3",
      id: "3",
      image: "/images/spine.png",
      name: "Cột sống",
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        QUẢN LÝ CHUYÊN KHOA
      </h2>

      {/* Bộ lọc */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Input placeholder="Tên chuyên khoa" />
        <div className="col-span-3 flex justify-start">
          <Button type="primary" className="mr-2">
            Ứng dụng
          </Button>
          <Button> Cài lại </Button>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <Table columns={columns} dataSource={data} pagination={false} />

      {/* Nút thêm chuyên khoa */}
      <div className="flex justify-end mt-4">
        <Button type="primary" icon={<i className="fas fa-plus"></i>}>
          Thêm
        </Button>
      </div>
    </div>
  );
};

export default Department;
