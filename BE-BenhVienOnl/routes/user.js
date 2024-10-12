const express = require("express");
const router = express.Router();
const { verifyToken, isAdmin, isDoctor } = require("../Middleware/Middleware");
const {
  getUserById,
  updateUser,
  loginUser,
  createUser,
  searchUsers,
  getUsers,
  createDoctor,
  getDoctors,
} = require("../controllers/userController");

router.post("/login", loginUser);
router.post("/doctors", verifyToken, isAdmin, createDoctor);
router.get("/doctors", verifyToken, isAdmin, getDoctors);
router.post("/register", createUser);
router.get("/profile", verifyToken, getUserById);
router.get("/users", getUsers);
router.put("/update-profile", verifyToken, updateUser);
router.get("/search", searchUsers);

module.exports = router;
