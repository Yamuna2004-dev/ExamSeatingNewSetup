// backend/controllers/examScheduleController.js

const ExamSchedule = require('../../models/ExamSchedule'); // Import the model

// Create a new exam schedule (Insert)
exports.createExamSchedule = async (req, res) => {
  try {
    const examData = req.body; // Array of exam schedules
    const createdSchedules = await ExamSchedule.bulkCreate(examData);
    res.status(201).json({ message: 'Exam schedules saved successfully!', createdSchedules });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save exam schedule' });
  }
};

// Get all exam schedules (Read)
exports.getExamSchedules = async (req, res) => {
  try {
    const { year, department } = req.query; // Optional filters for year and department

    const filters = {};
    if (year) filters.year = year;
    if (department) filters.department = department;

    const schedules = await ExamSchedule.findAll({ where: filters });
    res.status(200).json(schedules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to retrieve exam schedules' });
  }
};

// Update an exam schedule (Update)
exports.updateExamSchedule = async (req, res) => {
  try {
    const { id, year, department, date, subjectTitle, subjectCode, session } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Exam schedule ID is required for update' });
    }

    const schedule = await ExamSchedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: 'Exam schedule not found' });
    }

    await schedule.update({
      year,
      department,
      date,
      subjectTitle,
      subjectCode,
      session
    });

    res.status(200).json({ message: 'Exam schedule updated successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update exam schedule' });
  }
};

// Delete an exam schedule (Delete)
exports.deleteExamSchedule = async (req, res) => {
  try {
    const { id } = req.params; // Get ID from request params

    if (!id) {
      return res.status(400).json({ error: 'Exam schedule ID is required to delete' });
    }

    const schedule = await ExamSchedule.findByPk(id);

    if (!schedule) {
      return res.status(404).json({ error: 'Exam schedule not found' });
    }

    await schedule.destroy();

    res.status(200).json({ message: 'Exam schedule deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete exam schedule' });
  }
};
