const Department = require('../models/Departmentconfig');

// Get all
exports.getAllDepartments = async (req, res) => {
  try {
    const result = await Department.findAll();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
};

// Add
exports.addDepartment = async (req, res) => {
  try {
    const { dep_id, dep_name } = req.body;
    const newDept = await Department.create({ dep_id, dep_name });
    res.status(201).json(newDept);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add department' });
  }
};

// Delete
exports.deleteDepartment = async (req, res) => {
  try {
    const id = req.params.id;
    await Department.destroy({ where: { dep_id: id } });
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete department' });
  }
};
