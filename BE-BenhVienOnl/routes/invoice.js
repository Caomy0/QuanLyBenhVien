const express = require("express");
const router = express.Router();
const {
  createInvoice,
  getInvoices,
  getInvoiceById,
  updateInvoiceStatus,
  deleteInvoice,
} = require("../controllers/invoiceController");

// @route  POST api/invoices
// @desc   Tạo hóa đơn mới
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.post("/", createInvoice);

// @route  GET api/invoices
// @desc   Xem tất cả hóa đơn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/", getInvoices);

// @route  GET api/invoices/:id
// @desc   Xem chi tiết một hóa đơn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.get("/:id", getInvoiceById);

// @route  PUT api/invoices/:id
// @desc   Cập nhật trạng thái thanh toán của hóa đơn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.put("/:id", updateInvoiceStatus);

// @route  DELETE api/invoices/:id
// @desc   Xóa hóa đơn
// @access Public (có thể thay đổi thành Private nếu cần xác thực)
router.delete("/:id", deleteInvoice);

module.exports = router;
