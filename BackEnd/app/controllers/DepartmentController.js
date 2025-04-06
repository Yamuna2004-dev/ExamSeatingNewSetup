const Department = require("../models/Departmentconfig");

exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments." });
  }
};

exports.createDepartment = async (req, res) => {
  const { id, name } = req.body;
  try {
    const newDept = await Department.create({ id, name });
    res.status(201).json(newDept);
  } catch (error) {
    res.status(500).json({ error: "Failed to create department." });
  }
};

exports.updateDepartment = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const dept = await Department.findByPk(id);
    if (!dept) return res.status(404).json({ error: "Department not found." });

    dept.name = name;
    await dept.save();
    res.json(dept);
  } catch (error) {
    res.status(500).json({ error: "Failed to update department." });
  }
};

exports.deleteDepartment = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Department.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: "Not found." });

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete." });
  }
};
