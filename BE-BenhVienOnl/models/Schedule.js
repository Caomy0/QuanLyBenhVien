const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Liên kết đến model User với vai trò là "doctor"
    required: true,
  },
  workDate: {
    type: Date, // Ngày làm việc
    required: true,
  },
  startTime: {
    type: String, // Giờ bắt đầu làm việc (ví dụ: "09:00 AM")
    required: true,
  },
  endTime: {
    type: String, // Giờ kết thúc làm việc (ví dụ: "05:00 PM")
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "booked", "unavailable"], // Trạng thái lịch làm việc: có thể làm việc, đã được đặt, không có sẵn
    default: "available",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Tạo model cho lịch làm việc của bác sĩ
module.exports = mongoose.model("Schedule", ScheduleSchema);
