const Prescription = require("../models/Prescription");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Tạo đơn thuốc mới
exports.createPrescription = async (req, res) => {
  const { patientId, doctorId, medicines } = req.body;

  try {
    // Kiểm tra xem bệnh nhân có tồn tại không
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Kiểm tra xem bác sĩ có tồn tại trong model Doctor không
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ msg: "Doctor not found" });
    }

    // Tạo đơn thuốc mới
    const prescription = new Prescription({
      patient: patientId,
      doctor: doctorId, // Sử dụng doctorId từ model Doctor
      medicines,
    });

    await prescription.save();

    res
      .status(201)
      .json({ msg: "Prescription created successfully", prescription });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem tất cả đơn thuốc
exports.getPrescriptions = async (req, res) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient", "name age gender")
      .populate("doctor", "name");

    res.json(prescriptions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem chi tiết một đơn thuốc
exports.getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name age gender")
      .populate("doctor", "name");

    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    res.json(prescription);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Cập nhật đơn thuốc
exports.updatePrescription = async (req, res) => {
  const { medicines } = req.body;

  try {
    let prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    // Cập nhật các thông tin mới
    if (medicines) prescription.medicines = medicines;

    prescription = await prescription.save();

    res.json({ msg: "Prescription updated successfully", prescription });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xóa đơn thuốc
exports.deletePrescription = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ msg: "Prescription not found" });
    }

    await prescription.remove();

    res.json({ msg: "Prescription deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
