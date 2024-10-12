const Department = require("../models/Department");

// Tạo khoa mới
exports.createDepartment = async (req, res) => {
  const { name, description } = req.body;

  try {
    let department = await Department.findOne({ name });

    if (department) {
      return res.status(400).json({ msg: "Department already exists" });
    }

    department = new Department({
      name,
      description,
    });

    await department.save();

    res.json({ msg: "Department created successfully", department });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem tất cả các khoa
exports.getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Xem chi tiết một khoa
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);

    if (!department) {
      return res.status(404).json({ msg: "Department not found" });
    }

    res.json(department);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
