const express = require("express");
const router = express.Router();
const performanceController = require("../Controllers/performanceController");

router.get(
  "/student-performance/:userID",
  performanceController.getStudentPerformance
);
router.get(
  "/teacher-overview/:teacherID",
  performanceController.getTeacherOverview
);

module.exports = router;
