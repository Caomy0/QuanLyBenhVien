const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");

// Tạo cuộc hẹn mới
exports.createAppointment = async (req, res) => {
  const { patientId, doctorId, date, reason } = req.body;

  try {
    // Kiểm tra xem bệnh nhân có tồn tại không
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Kiểm tra xem bác sĩ có tồn tại không trong model Doctor
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Tạo cuộc hẹn mới
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId, // Sử dụng doctorId từ model Doctor
      date,
      reason,
    });

    await appointment.save();

    res
      .status(201)
      .json({ msg: "Appointment created successfully", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem tất cả các cuộc hẹn
exports.getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name")
      .populate("doctor", "name");

    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem chi tiết một cuộc hẹn
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "name")
      .populate("doctor", "name");

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    res.json(appointment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Cập nhật cuộc hẹn
exports.updateAppointment = async (req, res) => {
  const { date, status, reason, notes } = req.body;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Chỉ cập nhật những trường có trong body
    if (date) appointment.date = date;
    if (status) appointment.status = status;
    if (reason) appointment.reason = reason;
    if (notes) appointment.notes = notes;

    appointment = await appointment.save();

    res.json({ msg: "Appointment updated successfully", appointment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Hủy cuộc hẹn
exports.cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ msg: "Appointment not found" });
    }

    // Xóa cuộc hẹn
    await appointment.remove();

    res.json({ msg: "Appointment canceled successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
