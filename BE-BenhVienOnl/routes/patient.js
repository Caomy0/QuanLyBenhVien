const express = require("express");
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
} = require("../controllers/patientController");
router.post("/", createPatient);

// @route  GET api/patients
// @desc   Xem tất cả bệnh nhân
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/", getPatients);

// @route  GET api/patients/:id
// @desc   Xem chi tiết một bệnh nhân
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/:id", getPatientById);

// @route  PUT api/patients/:id
// @desc   Cập nhật thông tin bệnh nhân
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.put("/:id", updatePatient);

// @route  DELETE api/patients/:id
// @desc   Xóa bệnh nhân
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.delete("/:id", deletePatient);

module.exports = router;
