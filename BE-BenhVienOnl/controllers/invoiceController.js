const Invoice = require("../models/Invoice");
const Patient = require("../models/Patient");

// Tạo hóa đơn mới
exports.createInvoice = async (req, res) => {
  const { patientId, amount, status } = req.body;

  try {
    // Kiểm tra bệnh nhân có tồn tại hay không
    const patient = await Patient.findById(patientId);

    if (!patient) {
      return res.status(404).json({ msg: "Patient not found" });
    }

    // Tạo hóa đơn mới
    const invoice = new Invoice({
      patient: patientId,
      amount,
      status: status || "unpaid", // Nếu không có trạng thái thì mặc định là 'unpaid'
    });

    await invoice.save();

    res.status(201).json({ msg: "Invoice created successfully", invoice });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem tất cả hóa đơn
exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate(
      "patient",
      "name age gender"
    );

    res.json(invoices);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem chi tiết một hóa đơn
exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate(
      "patient",
      "name age gender"
    );

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    res.json(invoice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Cập nhật trạng thái thanh toán của hóa đơn
exports.updateInvoiceStatus = async (req, res) => {
  const { status } = req.body;

  try {
    let invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    // Cập nhật trạng thái thanh toán
    invoice.status = status || invoice.status;

    invoice = await invoice.save();

    res.json({ msg: "Invoice status updated successfully", invoice });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xóa hóa đơn
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ msg: "Invoice not found" });
    }

    await invoice.remove();

    res.json({ msg: "Invoice deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
