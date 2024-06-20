const router = require("express").Router();

const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGradeById,
  deleteGradeById,
  getGradeByStudentId
} = require("../Controllers/gradeController");

router.post("/createGrade", createGrade);
router.get("/getAllGrades", getAllGrades);
router.get("/getGradeById/:id", getGradeById);
router.put("/updateGradeById/:id", updateGradeById);
router.delete("/deleteGradeById/:id", deleteGradeById);
router.get("/getGradeByStudentId/:studentId", getGradeByStudentId);

module.exports = router;
