const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const DepartmentController = require("../app/controllers/DepartmentController")
const ExamScheduleController = require('../app/controllers/ExamScheduleController');
const ChiefExaminerController = require('../app/controllers/ChiefExaminerController');
const ReportController = require('../app/controllers/ReportController');

router.get('/', HomeController.homePage);

router.get('/dept/get', DepartmentController.getAllDepartments);
router.post('/dept/insert', DepartmentController.addDepartment);
router.delete('/dept/delete/:id', DepartmentController.deleteDepartment);

// Report Routes
router.get('/reports', ReportController.getAllReports);
router.get('/reports/:id', ReportController.getReportById);
router.post('/reports', ReportController.createReport);
router.put('/reports/:id', ReportController.updateReport);
router.delete('/reports/:id', ReportController.deleteReport);

//Exam Schedule Routes
router.get('/schedule/get', ExamScheduleController.getAllSchedules);
router.post('/schedule/insert', ExamScheduleController.addSchedule);
router.put('/schedule/update/:id', ExamScheduleController.updateSchedule);
router.delete('/schedule/delete/:id', ExamScheduleController.deleteSchedule);


// Chief Examiner Routes
router.get('/chief-examiners', ChiefExaminerController.getAll);
router.get('/chief-examiners/:email', ChiefExaminerController.getByEmail);
router.post('/chief-examiners/register', ChiefExaminerController.register);
router.post('/chief-examiners/login', ChiefExaminerController.login);
router.put('/chief-examiners/:id', ChiefExaminerController.update);
router.delete('/chief-examiners/:id', ChiefExaminerController.delete);

router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;
