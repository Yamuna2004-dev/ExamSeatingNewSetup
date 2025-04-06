const express = require('express');
const router = express.Router();
const HomeController = require('../app/controllers/HomeController');
const AuthController = require('../app/controllers/AuthController');
const DepartmentController = require("../app/controllers/DepartmentController")

router.get('/', HomeController.homePage);
router.get('/dept/get', DepartmentController.getAllDepartments);
router.post('/dept/delete', DepartmentController.deleteDepartment);
router.post('/dept/insert', DepartmentController.createDepartment);
router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/sign-up', AuthController.signUpPage);
router.post('/sign-up', AuthController.signUp);
router.get('/forgot-password', AuthController.forgotPasswordPage);
router.post('/forgot-password', AuthController.forgotPassword);

module.exports = router;