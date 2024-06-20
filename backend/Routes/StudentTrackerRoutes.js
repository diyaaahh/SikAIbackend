const Router = require("express").Router();
const {
  addStudentTracker,
  getStudentTracker,
  updateStudentTracker,
  getAllStudentTrackers,
} = require("../Controllers/StudentTrackerController");
Router.get("/all/:courseId", getAllStudentTrackers);
Router.post("/add", addStudentTracker);
Router.get("/:id/:courseId", getStudentTracker);
Router.put("/:id/:courseId", updateStudentTracker);


module.exports = Router;
