const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  phone: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  specialty: {
    type: String, // Chuyên khoa của bác sĩ
    required: function () {
      return this.role === "doctor";
    },
  },
  experience: {
    type: Number, // Số năm kinh nghiệm
    required: function () {
      return this.role === "doctor";
    },
  },
  degree: {
    type: String, // Bằng cấp của bác sĩ
    required: function () {
      return this.role === "doctor";
    },
  },
  schedule: {
    type: [
      {
        days: {
          type: [String], // Mảng các ngày trong tuần (ví dụ: ["Monday", "Wednesday", "Friday"])
          required: true,
        },
        startTime: {
          type: [String], // Giờ bắt đầu làm việc (ví dụ: "09:00 AM")
          required: true,
        },
        endTime: {
          type: [String], // Giờ kết thúc làm việc (ví dụ: "05:00 PM")
          required: true,
        },
      },
    ],
    required: function () {
      return this.role === "doctor";
    },
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);
