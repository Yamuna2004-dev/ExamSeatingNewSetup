const Report = require('../models/Report');

// 🔹 Get all allocated seats
exports.getAll = async (req, res) => {
  try {
    const reports = await Report.findAll();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one by register number
exports.getById = async (req, res) => {
  try {
    const report = await Report.findByPk(req.params.stdreg);
    if (!report) return res.status(404).json({ message: "Not found" });
    res.json(report);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Create new seat allocation
exports.create = async (req, res) => {
  try {
    const newReport = await Report.create(req.body);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Update seat allocation
exports.update = async (req, res) => {
  try {
    const [updated] = await Report.update(req.body, {
      where: { stdreg: req.params.stdreg }
    });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//  Delete seat allocation
exports.delete = async (req, res) => {
  try {
    const deleted = await Report.destroy({
      where: { stdreg: req.params.stdreg }
    });
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
