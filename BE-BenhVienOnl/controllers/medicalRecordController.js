const MedicalRecord = require("../models/MedicalRecord");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor");

// Tạo hồ sơ bệnh án mới
exports.createMedicalRecord = async (req, res) => {
  const { patientId, doctorId, diagnosis, treatment, notes } = req.body;

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

    // Tạo hồ sơ bệnh án mới
    const medicalRecord = new MedicalRecord({
      patient: patientId,
      doctor: doctorId, // Sử dụng doctorId từ model Doctor
      diagnosis,
      treatment,
      notes,
    });

    await medicalRecord.save();

    res
      .status(201)
      .json({ msg: "Medical record created successfully", medicalRecord });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem tất cả hồ sơ bệnh án
exports.getMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find()
      .populate("patient", "name age gender")
      .populate("doctor", "name");

    res.json(medicalRecords);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem chi tiết một hồ sơ bệnh án
exports.getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate("patient", "name age gender")
      .populate("doctor", "name");

    if (!medicalRecord) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    res.json(medicalRecord);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Cập nhật hồ sơ bệnh án
exports.updateMedicalRecord = async (req, res) => {
  const { diagnosis, treatment, notes } = req.body;

  try {
    let medicalRecord = await MedicalRecord.findById(req.params.id);

    if (!medicalRecord) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    // Cập nhật các thông tin mới
    if (diagnosis) medicalRecord.diagnosis = diagnosis;
    if (treatment) medicalRecord.treatment = treatment;
    if (notes) medicalRecord.notes = notes;

    medicalRecord = await medicalRecord.save();

    res.json({ msg: "Medical record updated successfully", medicalRecord });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xóa hồ sơ bệnh án
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);

    if (!medicalRecord) {
      return res.status(404).json({ msg: "Medical record not found" });
    }

    await medicalRecord.remove();

    res.json({ msg: "Medical record deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
