const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");

// Load environment variables
require("dotenv").config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(
  cors({
    origin: "*" || "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.json());

// Define routes
app.use("/api/users", require("./routes/user"));
// app.use("/api/patients", require("./routes/patient"));
// app.use("/api/appointments", require("./routes/appointment"));
// app.use("/api/medical-records", require("./routes/medicalRecord"));
// app.use("/api/prescriptions", require("./routes/prescription"));
// app.use("/api/invoices", require("./routes/invoice"));
app.use("/api", require("./routes/doctor"));
// app.use("/api/departments", require("./routes/department"));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
