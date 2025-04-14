const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const DepartmentController = require("../app/controllers/DepartmentController")
const RoomController = require('../app/controllers/RoomController');
const SeatAllocationController = require('../app/controllers/SeatAllocationController');
const ExamScheduleController = require('../app/controllers/ExamScheduleController');
const ChiefExaminerController = require('../app/controllers/ChiefExaminerController');

router.get('/rooms', RoomController.getAllRooms);
router.post('/rooms', RoomController.createRoom);
router.delete('/rooms/:roomNumber', RoomController.deleteRoom);

router.get('/', HomeController.homePage);

router.get('/dept/get', DepartmentController.getAllDepartments);
router.post('/dept/insert', DepartmentController.addDepartment);
router.delete('/dept/delete/:id', DepartmentController.deleteDepartment);
// Seat Allocation CRUD routes
router.get('/seat-allocation', SeatAllocationController.getAll);
router.get('/seat-allocation/:stdreg', SeatAllocationController.getById);
router.post('/seat-allocation', SeatAllocationController.create);
router.put('/seat-allocation/:stdreg', SeatAllocationController.update);
router.delete('/seat-allocation/:stdreg', SeatAllocationController.delete);
// Exam Schedule Routes
router.get('/exam-schedule', ExamScheduleController.getExamSchedules);
// router.get('/exam-schedule/:subname', ExamScheduleController.getById);
router.post('/exam-schedule', ExamScheduleController.createExamSchedule);
router.put('/exam-schedule/:subname', ExamScheduleController.updateExamSchedule);
router.delete('/exam-schedule/:subname', ExamScheduleController.deleteExamSchedule);
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