const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
} = require("../controllers/appointmentController");

// @route  POST api/appointments
// @desc   Tạo cuộc hẹn mới
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.post("/", createAppointment);

// @route  GET api/appointments
// @desc   Xem tất cả các cuộc hẹn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/", getAppointments);

// @route  GET api/appointments/:id
// @desc   Xem chi tiết một cuộc hẹn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/:id", getAppointmentById);

// @route  PUT api/appointments/:id
// @desc   Cập nhật cuộc hẹn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.put("/:id", updateAppointment);

// @route  DELETE api/appointments/:id
// @desc   Hủy cuộc hẹn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.delete("/:id", cancelAppointment);

module.exports = router;
