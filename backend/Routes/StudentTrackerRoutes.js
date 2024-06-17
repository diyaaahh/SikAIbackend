const Router = require("express").Router();
const {
  addStudentTracker,
  getStudentTracker,
  updateStudentTracker,
  getAllStudentTrackers,
} = require("../Controllers/StudentTrackerController");
Router.post("/add", addStudentTracker);
Router.get("/:studentId", getStudentTracker);
Router.put("/:studentId", updateStudentTracker);
Router.get("/getAll", getAllStudentTrackers);

module.exports = Router;
