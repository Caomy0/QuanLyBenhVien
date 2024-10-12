import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";

const SectionHeader = () => {
  return (
    <div className="section-header px-6 text-center md:text-left">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Gói xét nghiệm tổng quát{" "}
        <span className="text-blue-600">Diag Wellness Checkup</span>
      </h2>
      <ul className="space-y-4 text-lg text-gray-700">
        <li>
          <CheckCircleOutlined className="text-green-500" /> Xét nghiệm 36 chỉ
          số quan trọng của cơ thể
        </li>
        <li>
          <CheckCircleOutlined className="text-green-500" /> Xét nghiệm toàn
          diện về tim, gan, thận, tiểu đường, mỡ máu...
        </li>
        <li>
          <CheckCircleOutlined className="text-green-500" /> Bác sĩ hướng dẫn
          đọc kết quả và tư vấn sức khỏe miễn phí
        </li>
        <li>
          <CheckCircleOutlined className="text-green-500" /> Quy trình đơn giản,
          nhanh chóng
        </li>
        <li>
          <CheckCircleOutlined className="text-green-500" /> Làm việc ngoài giờ
          hành chính từ Thứ 2 - Chủ Nhật
        </li>
      </ul>
      <Button type="primary" className="mt-6 bg-blue-600 text-white">
        Tư vấn miễn phí
      </Button>
    </div>
  );
};

export default SectionHeader;
