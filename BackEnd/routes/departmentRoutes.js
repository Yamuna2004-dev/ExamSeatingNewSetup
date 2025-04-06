const express = require("express");
const router = express.Router();
const DepartmentController = require("../app/controllers/DepartmentController");

router.get("/", DepartmentController.getAllDepartments);         // Read
router.post("/", DepartmentController.createDepartment);         // Create
router.put("/:id", DepartmentController.updateDepartment);       // Update
router.delete("/:id", DepartmentController.deleteDepartment);    // Delete

module.exports = router;
