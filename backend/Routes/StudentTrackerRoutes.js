const Router = require("express").Router();
const {
  addStudentTracker,
  getStudentTracker,
  updateStudentTracker,
  getAllStudentTrackers,
} = require("../Controllers/StudentTrackerController");
Router.post("/add", addStudentTracker);
Router.get("/:id/:courseId", getStudentTracker);
Router.put("/:id/:courseId", updateStudentTracker);
Router.get("/getAll", getAllStudentTrackers);

module.exports = Router;
