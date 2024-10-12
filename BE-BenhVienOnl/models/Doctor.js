const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Tham chiếu đến bảng User
    required: true,
  },
  specialty: {
    type: String, // Chuyên khoa (ví dụ: Nội khoa, Nhi khoa)
    required: true,
  },
  experience: {
    type: Number, // Số năm kinh nghiệm
    required: true,
  },
  degrees: [
    {
      degreeName: String, // Tên bằng cấp
      institution: String, // Tổ chức cấp bằng
      year: Number, // Năm cấp bằng
    },
  ],
  hospital: {
    type: String, // Bệnh viện đang công tác
    required: true,
  },
  location: {
    type: String, // Địa chỉ làm việc
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Doctor", DoctorSchema);
