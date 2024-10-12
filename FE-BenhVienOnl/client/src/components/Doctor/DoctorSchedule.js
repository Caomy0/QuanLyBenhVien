import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Spin, Alert } from "antd";
import moment from "moment"; // Import moment để định dạng thời gian
import { fetchUserProfile } from "../../Redux/User/userSlice"; // Import action

const DoctorSchedule = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user); // Lấy thông tin user từ Redux
  const [schedule, setSchedule] = useState([]);

  // Lấy thông tin user khi component được mount
  useEffect(() => {
    dispatch(fetchUserProfile())
      .unwrap()
      .then((data) => {
        if (data.schedule) {
          setSchedule(data.schedule); // Lưu lịch trình nếu có
        }
      })
      .catch((err) => {
        console.error("Lỗi khi lấy thông tin profile: ", err);
      });
  }, [dispatch]);

  // Định nghĩa các cột cho bảng lịch trình
  const columns = [
    {
      title: "Ngày",
      dataIndex: "days",
      key: "days",
      render: (days) => {
        if (!days || days.length === 0) return "Không có ngày làm việc";
        return days.join(", "); // Hiển thị các ngày làm việc (nếu có)
      },
    },
    {
      title: "Giờ bắt đầu",
      dataIndex: "startTime",
      key: "startTime",
      render: (startTime) => {
        if (!startTime || startTime.length === 0) return "Chưa có giờ bắt đầu";
        return startTime
          .map((time) => moment(time).format("HH:mm")) // Định dạng từng giờ bắt đầu
          .join(", ");
      },
    },
    {
      title: "Giờ kết thúc",
      dataIndex: "endTime",
      key: "endTime",
      render: (endTime) => {
        if (!endTime || endTime.length === 0) return "Chưa có giờ kết thúc";
        return endTime
          .map((time) => moment(time).format("HH:mm")) // Định dạng từng giờ kết thúc
          .join(", ");
      },
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Lịch trình của bác sĩ
      </h2>

      {/* Hiển thị loading khi đang tải */}
      {loading && (
        <Spin tip="Đang tải dữ liệu...">
          <Alert message="Đang tải lịch trình" type="info" />
        </Spin>
      )}

      {/* Hiển thị thông báo lỗi nếu có lỗi */}
      {error && (
        <Alert
          message="Lỗi khi tải lịch trình"
          description={error}
          type="error"
        />
      )}

      {/* Hiển thị bảng lịch trình khi có dữ liệu */}
      {!loading && schedule.length > 0 && (
        <Table
          columns={columns}
          dataSource={schedule}
          rowKey={(record, index) => index} // Dùng index làm key vì không có ID
          pagination={false} // Tắt phân trang
        />
      )}

      {/* Hiển thị thông báo nếu không có lịch trình */}
      {!loading && schedule.length === 0 && (
        <Alert message="Không có lịch trình nào được tìm thấy" type="warning" />
      )}
    </div>
  );
};

export default DoctorSchedule;
