const Examschedule = require('../models/ExamSchedule');
const Department = require('../models/Departmentconfig');

// GET all exam schedules
exports.getAllSchedules = async (req, res) => {
  try {
    const schedules = await Examschedule.findAll();
    res.json(schedules);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch exam schedules' });
  }
};

// ADD new schedule
exports.addSchedule = async (req, res) => {
  try {
    const departmentMap = await Department.findAll({
      attributes: ['dep_name', 'dep_id']
    }).then(departments => {
      return departments.reduce((map, dept) => {
      map[dept.dep_name] = dept.dep_id;
      return map;
      }, {});
    });

    const schedulesToCreate = req.body.exm.map(schedule => ({
      depid: `${departmentMap[schedule.department]}` || "",
      date: schedule.date,
      year: schedule.year,
      session: schedule.session,
      depname: schedule.department,
      subname: schedule.subjectTitle,
      semester: "",
      subcode: schedule.subjectCode
    }));

    await Examschedule.bulkCreate(schedulesToCreate);
    res.status(201).json({ message: 'Schedules added successfully' });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(400).json({ error: 'Validation error', details: error.errors.map(e => e.message) });
    } else {
      res.status(400).json({ error: 'Failed to add schedule', details: error.message });
    }
  }
};

// UPDATE a schedule
exports.updateSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const [updated] = await Examschedule.update(req.body, { where: { id } });
    if (updated) {
      const updatedSchedule = await Examschedule.findByPk(id);
      res.json(updatedSchedule);
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update schedule', details: error.message });
  }
};

// DELETE a schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await Examschedule.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: 'Deleted successfully' });
    } else {
      res.status(404).json({ error: 'Schedule not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to delete schedule', details: error.message });
  }
};
