const express = require("express");
const router = express.Router();
const { createDoctor } = require("../controllers/doctorController");
const { verifyToken, isAdmin } = require("../Middleware/Middleware");

router.post("/doctors", verifyToken, isAdmin, createDoctor);

module.exports = router;
