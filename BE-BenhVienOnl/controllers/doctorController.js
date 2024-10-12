const User = require("../models/User");
const Doctor = require("../models/Doctor");
const bcrypt = require("bcryptjs");

// Tạo mới bác sĩ và user
exports.createDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    specialty,
    experience,
    degree,
    hospital,
    location,
  } = req.body;

  try {
    // Kiểm tra xem email có tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Tạo tài khoản người dùng cho bác sĩ
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
      role: "doctor", // Vai trò là "doctor"
    });

    const savedUser = await user.save(); // Lưu user

    // Tạo thông tin bác sĩ với userId từ người dùng đã tạo
    const doctor = new Doctor({
      userId: savedUser._id, // Liên kết userId của bác sĩ
      name: savedUser.name,
      specialty,
      experience,
      degrees: degree, // Đảm bảo degrees là một mảng
      hospital,
      location,
    });

    const savedDoctor = await doctor.save(); // Lưu thông tin bác sĩ

    res.status(201).json({
      msg: "Doctor created successfully",
      doctor: savedDoctor,
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
