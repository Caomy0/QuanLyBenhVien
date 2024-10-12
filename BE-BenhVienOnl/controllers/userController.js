const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../Middleware/Middleware");

// Controller tạo bác sĩ mới
exports.createDoctor = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    address,
    specialty,
    experience,
    degree,
    schedule, // Lịch làm việc của bác sĩ được gửi từ client
  } = req.body;

  try {
    // Kiểm tra xem tất cả các trường bắt buộc có được cung cấp không
    if (!name || !email || !password || !specialty || !experience || !degree) {
      return res
        .status(400)
        .json({ msg: "Vui lòng cung cấp đầy đủ thông tin" });
    }

    // Kiểm tra xem email đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Email đã tồn tại" });
    }

    // Tạo người dùng mới với role là doctor
    user = new User({
      name,
      email,
      password,
      role: "doctor", // Đặt role là doctor
      phone,
      address,
      specialty, // Thông tin chuyên khoa của bác sĩ
      experience, // Kinh nghiệm bác sĩ
      degree, // Bằng cấp của bác sĩ
      schedule, // Lịch làm việc của bác sĩ
    });

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Lưu người dùng vào database
    await user.save();

    // Trả về phản hồi thành công
    res.status(201).json({ msg: "Bác sĩ được tạo thành công", user });
  } catch (error) {
    console.error(error); // Log lỗi trên server
    res.status(500).json({ msg: "Lỗi máy chủ", error });
  }
};

exports.getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }); // Tìm kiếm user với role là doctor
    if (doctors.length === 0) {
      return res.status(404).json({ msg: "No doctors found" });
    }
    res.status(200).json(doctors); // Trả về danh sách các bác sĩ
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Đăng nhập người dùng
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // Tạo JWT token
    const token = generateToken(user);

    // Trả về toàn bộ thông tin người dùng cùng với token
    res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address,
        date: user.date,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

exports.getUserById = (req, res) => {
  const userId = req.user.id;
  User.findById(userId)
    .then((user) => {
      if (!user) return res.status(404).send("User not found");
      res.json(user); // Trả về thông tin người dùng
    })
    .catch((err) => {
      res.status(500).send("Server error");
    });
};

// Cập nhật thông tin người dùng hiện tại (đã đăng nhập)
exports.updateUser = async (req, res) => {
  const { name, email, password, phone, address, schedule } = req.body;

  try {
    // Tìm người dùng bằng ID
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Cập nhật thông tin cá nhân
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt); // Mã hóa mật khẩu trước khi lưu
    }
    if (phone) user.phone = phone;
    if (address) user.address = address;
    if (user.role === "doctor") {
      // Kiểm tra xem lịch làm việc có hợp lệ không
      if (schedule && Array.isArray(schedule)) {
        // Cập nhật lịch làm việc
        user.schedule = schedule;
      } else if (schedule) {
        return res.status(400).json({ msg: "Invalid schedule format" });
      }
    }

    // Lưu người dùng vào cơ sở dữ liệu
    await user.save();
    res.status(200).json({ msg: "User updated successfully", user });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Xóa người dùng (chỉ dành cho admin)
exports.deleteUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    await user.remove();
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Xem danh sách người dùng (dành cho admin và doctor)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Đăng ký người dùng mới (có thể dành cho admin tạo tài khoản mới)
exports.createUser = async (req, res) => {
  const { name, email, password, role, phone, address } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    user = new User({
      name,
      email,
      password,
      role,
      phone,
      address,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt); // Mã hóa mật khẩu

    await user.save();
    res.status(201).json({ msg: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
// Tìm kiếm người dùng theo query
exports.searchUsers = async (req, res) => {
  const { name, email, role, phone, address } = req.query;

  // Tạo đối tượng query động
  let query = {};

  if (name) query.name = { $regex: name, $options: "i" };
  if (email) query.email = { $regex: email, $options: "i" };
  if (role) query.role = role;
  if (phone) query.phone = { $regex: phone, $options: "i" };
  if (address) query.address = { $regex: address, $options: "i" };

  try {
    const users = await User.find(query); // Tìm kiếm với các query
    if (users.length === 0) {
      return res.status(404).json({ msg: "No users found" });
    }
    res.status(200).json(users); // Trả về kết quả tìm kiếm
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};
