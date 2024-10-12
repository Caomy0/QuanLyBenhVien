const express = require("express");
const router = express.Router();
const {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
} = require("../controllers/prescriptionController");

// @route  POST api/prescriptions
// @desc   Tạo đơn thuốc mới
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.post("/", createPrescription);

// @route  GET api/prescriptions
// @desc   Xem tất cả đơn thuốc
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/", getPrescriptions);

// @route  GET api/prescriptions/:id
// @desc   Xem chi tiết một đơn thuốc
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/:id", getPrescriptionById);

// @route  PUT api/prescriptions/:id
// @desc   Cập nhật đơn thuốc
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.put("/:id", updatePrescription);

// @route  DELETE api/prescriptions/:id
// @desc   Xóa đơn thuốc
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.delete("/:id", deletePrescription);

module.exports = router;
