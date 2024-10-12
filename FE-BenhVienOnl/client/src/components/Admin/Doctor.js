import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Drawer,
  Form,
  Input,
  Select,
  notification,
  Popconfirm,
  Modal,
  TimePicker,
} from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDoctors,
  createDoctor,
  deleteDoctor,
  updateProfile,
} from "../../Redux/User/userSlice"; // Import các action từ Redux

const { Option } = Select;

const DoctorManagement = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.user); // Lấy dữ liệu từ Redux
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Trạng thái mở/đóng drawer
  const [isEditing, setIsEditing] = useState(false); // Kiểm tra có đang chỉnh sửa hay không
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); // Lưu ID của bác sĩ đang được chỉnh sửa
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false); // Trạng thái mở/đóng modal quản lý lịch

  // State cho form thông tin bác sĩ
  const [doctorData, setDoctorData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    specialty: "",
    experience: "",
    degree: "",
    schedule: "",
  });

  const [schedule, setSchedule] = useState([
    { days: [], startTime: "", endTime: "" }, // Mặc định với một lịch trống
  ]);

  // Lấy danh sách bác sĩ khi component được render
  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  // Mở drawer để thêm hoặc chỉnh sửa thông tin bác sĩ
  const showDrawer = () => {
    setIsDrawerOpen(true);
  };

  // Đóng drawer và reset các dữ liệu trong form
  const onClose = () => {
    setIsDrawerOpen(false);
    setIsEditing(false);
    setSelectedDoctorId(null);
    setDoctorData({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      specialty: "",
      experience: "",
      degree: "",
    });
    setSchedule([{ days: [], startTime: "", endTime: "" }]); // Reset lịch làm việc
  };

  // Hàm xử lý khi submit form thêm/cập nhật bác sĩ
  const handleSubmitDoctor = () => {
    // Kiểm tra nếu các trường cần thiết không được điền
    if (!doctorData.name || !doctorData.email || !doctorData.specialty) {
      return notification.error({
        message: "Vui lòng nhập đủ thông tin",
      });
    }

    const userData = {
      doctorId: selectedDoctorId,
      ...doctorData, // Thông tin cơ bản của bác sĩ
      schedule, // Lịch làm việc
    };

    // Xử lý nếu đang trong chế độ chỉnh sửa
    if (isEditing) {
      dispatch(
        updateProfile(userData) // Cập nhật bác sĩ bằng API updateProfile
      )
        .unwrap()
        .then(() => {
          notification.success({
            message: "Bác sĩ đã được cập nhật thành công",
          });
          dispatch(fetchDoctors()); // Cập nhật danh sách bác sĩ
          onClose(); // Đóng drawer
        })
        .catch((err) => {
          notification.error({
            message: "Đã có lỗi xảy ra khi cập nhật bác sĩ",
            description: err,
          });
        });
    } else {
      // Xử lý khi tạo mới bác sĩ
      dispatch(createDoctor({ ...doctorData, schedule }))
        .unwrap()
        .then(() => {
          notification.success({
            message: "Bác sĩ đã được tạo thành công",
          });
          dispatch(fetchDoctors()); // Cập nhật danh sách bác sĩ
          onClose(); // Đóng drawer sau khi tạo thành công
        })
        .catch((err) => {
          notification.error({
            message: "Đã có lỗi xảy ra khi tạo bác sĩ",
            description: err,
          });
        });
    }
  };
  // Hàm xử lý xóa bác sĩ
  const handleDeleteDoctor = (doctorId) => {
    dispatch(deleteDoctor(doctorId)) // Xóa bác sĩ dựa trên ID
      .unwrap()
      .then(() => {
        notification.success({
          message: "Bác sĩ đã được xoá thành công",
        });
        dispatch(fetchDoctors()); // Cập nhật lại danh sách bác sĩ
      })
      .catch((err) => {
        notification.error({
          message: "Đã có lỗi xảy ra khi xoá bác sĩ",
          description: err,
        });
      });
  };

  // Hàm chỉnh sửa thông tin bác sĩ
  const handleEditDoctor = (doctor) => {
    // Điền lại thông tin bác sĩ vào form
    setDoctorData({
      name: doctor.name,
      email: doctor.email,
      password: "",
      phone: doctor.phone,
      address: doctor.address,
      specialty: doctor.specialty,
      experience: doctor.experience,
      degree: doctor.degree,
    });
    setSchedule(doctor.schedule || [{ days: [], startTime: "", endTime: "" }]);
    setSelectedDoctorId(doctor._id);
    setIsEditing(true);
    showDrawer();
  };

  const showScheduleModal = () => {
    setIsScheduleModalOpen(true);
  };

  const closeScheduleModal = () => {
    setIsScheduleModalOpen(false);
  };

  const handleScheduleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    setSchedule(newSchedule);
  };

  const addSchedule = () => {
    setSchedule([...schedule, { days: [], startTime: "", endTime: "" }]);
  };

  const removeSchedule = (index) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Chuyên khoa",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Kinh nghiệm",
      dataIndex: "experience",
      key: "experience",
    },
    {
      title: "Chức vụ",
      dataIndex: "degree",
      key: "degree",
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, doctor) => (
        <>
          <Button type="link" onClick={() => handleEditDoctor(doctor)}>
            Sửa
          </Button>
          <Popconfirm
            title="Bạn có chắc chắn muốn xoá bác sĩ này?"
            onConfirm={() => handleDeleteDoctor(doctor._id)}
            okText="Có"
            cancelText="Không"
          >
            <Button type="link" danger>
              Xóa
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        QUẢN LÝ BÁC SĨ
      </h2>
      <Button type="primary" onClick={showDrawer}>
        Thêm bác sĩ
      </Button>

      {/* Bảng danh sách bác sĩ */}
      <Table
        columns={columns}
        dataSource={doctors}
        loading={loading}
        rowKey={(record) => record._id}
        style={{ marginTop: 20 }}
      />

      {/* Drawer cho form thêm/chỉnh sửa bác sĩ */}
      <Drawer
        title={isEditing ? "Cập nhật Bác Sĩ" : "Thêm Bác Sĩ"}
        width={400}
        onClose={onClose}
        visible={isDrawerOpen}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form layout="vertical">
          <Form.Item label="Tên người dùng">
            <Input
              placeholder="Tên người dùng"
              value={doctorData.name}
              onChange={(e) =>
                setDoctorData({ ...doctorData, name: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              type="email"
              placeholder="Email"
              value={doctorData.email}
              onChange={(e) =>
                setDoctorData({ ...doctorData, email: e.target.value })
              }
            />
          </Form.Item>
          {!isEditing && (
            <Form.Item label="Mật khẩu">
              <Input
                type="password"
                placeholder="Mật khẩu"
                value={doctorData.password}
                onChange={(e) =>
                  setDoctorData({ ...doctorData, password: e.target.value })
                }
              />
            </Form.Item>
          )}
          <Form.Item label="Số điện thoại">
            <Input
              placeholder="Số điện thoại"
              value={doctorData.phone}
              onChange={(e) =>
                setDoctorData({ ...doctorData, phone: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Địa chỉ">
            <Input
              placeholder="Địa chỉ"
              value={doctorData.address}
              onChange={(e) =>
                setDoctorData({ ...doctorData, address: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Chuyên khoa">
            <Input
              placeholder="Chuyên khoa"
              value={doctorData.specialty}
              onChange={(e) =>
                setDoctorData({ ...doctorData, specialty: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Kinh nghiệm (Số năm)">
            <Input
              type="number"
              placeholder="Kinh nghiệm"
              value={doctorData.experience}
              onChange={(e) =>
                setDoctorData({ ...doctorData, experience: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Chức vụ">
            <Select
              placeholder="Chức vụ"
              value={doctorData.degree}
              onChange={(value) =>
                setDoctorData({ ...doctorData, degree: value })
              }
            >
              <Option value="Bác sĩ">Bác sĩ</Option>
              <Option value="Thạc sĩ">Thạc sĩ</Option>
              <Option value="Tiến sĩ">Tiến sĩ</Option>
            </Select>
          </Form.Item>
          <Button type="primary" onClick={showScheduleModal}>
            Cập nhật lịch làm việc
          </Button>
          <Button type="primary" onClick={handleSubmitDoctor} loading={loading}>
            {isEditing ? "Cập nhật Bác Sĩ" : "Thêm bác sĩ"}
          </Button>
        </Form>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Drawer>

      {/* Modal cho quản lý lịch làm việc */}
      <Modal
        title="Lịch làm việc"
        visible={isScheduleModalOpen}
        onOk={closeScheduleModal}
        onCancel={closeScheduleModal}
        okText="Lưu"
        cancelText="Đóng"
      >
        {schedule.map((daySchedule, index) => (
          <div key={index} style={{ marginBottom: "16px" }}>
            <Form.Item label="Ngày làm việc">
              <Select
                mode="multiple" // Chọn nhiều ngày
                placeholder="Chọn ngày"
                value={daySchedule.days}
                onChange={(value) => handleScheduleChange(index, "days", value)}
              >
                <Option value="Monday">Thứ 2</Option>
                <Option value="Tuesday">Thứ 3</Option>
                <Option value="Wednesday">Thứ 4</Option>
                <Option value="Thursday">Thứ 5</Option>
                <Option value="Friday">Thứ 6</Option>
                <Option value="Saturday">Thứ 7</Option>
                <Option value="Sunday">Chủ nhật</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Giờ bắt đầu">
              <TimePicker
                value={
                  daySchedule.startTime
                    ? moment(daySchedule.startTime, "HH:mm")
                    : null
                }
                onChange={(time) =>
                  handleScheduleChange(index, "startTime", time)
                }
                format="HH:mm"
              />
            </Form.Item>
            <Form.Item label="Giờ kết thúc">
              <TimePicker
                value={
                  daySchedule.endTime
                    ? moment(daySchedule.endTime, "HH:mm")
                    : null
                }
                onChange={(time) =>
                  handleScheduleChange(index, "endTime", time)
                }
                format="HH:mm"
              />
            </Form.Item>
            <Button
              type="danger"
              onClick={() => removeSchedule(index)}
              style={{ marginBottom: "16px" }}
            >
              Xóa lịch trình này
            </Button>
          </div>
        ))}
        <Button type="dashed" onClick={addSchedule}>
          Thêm lịch làm việc
        </Button>
      </Modal>
    </div>
  );
};

export default DoctorManagement;
