const express = require("express");
const router = express.Router();
const {
  createDepartment,
  getDepartments,
  getDepartmentById,
} = require("../controllers/departmentController");

// @route  POST api/departments
// @desc   Tạo khoa mới
// @access Public
router.post("/", createDepartment);

// @route  GET api/departments
// @desc   Xem tất cả các khoa
// @access Public
router.get("/", getDepartments);

// @route  GET api/departments/:id
// @desc   Xem chi tiết một khoa
// @access Public
router.get("/:id", getDepartmentById);

module.exports = router;
