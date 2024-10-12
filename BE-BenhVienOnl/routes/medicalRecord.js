const express = require("express");
const router = express.Router();
const {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

// @route  POST api/medical-records
// @desc   Tạo hồ sơ bệnh án mới
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.post("/", createMedicalRecord);

// @route  GET api/medical-records
// @desc   Xem tất cả hồ sơ bệnh án
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/", getMedicalRecords);

// @route  GET api/medical-records/:id
// @desc   Xem chi tiết một hồ sơ bệnh án
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/:id", getMedicalRecordById);

// @route  PUT api/medical-records/:id
// @desc   Cập nhật hồ sơ bệnh án
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.put("/:id", updateMedicalRecord);

// @route  DELETE api/medical-records/:id
// @desc   Xóa hồ sơ bệnh án
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.delete("/:id", deleteMedicalRecord);

module.exports = router;
