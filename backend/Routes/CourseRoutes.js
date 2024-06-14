const router = require("express").Router();

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addChapter,
  addStudent,
} = require("../Controllers/courseController");

router.post("/createCourse", createCourse);
router.post("/addChapter/:id", addChapter);
router.post("/addStudent/:id", addStudent);
router.get("/getAllCourses", getAllCourses);
router.get("/getCourseById/:id", getCourseById);
router.put("/updateCourseById/:id", updateCourseById);
router.delete("/deleteCourseById/:id", deleteCourseById);

module.exports = router;
