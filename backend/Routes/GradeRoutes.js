const router = require("express").Router();

const {
  createGrade,
  getAllGrades,
  getGradeById,
  updateGradeById,
  deleteGradeById,
} = require("../Controllers/gradeController");

router.post("/createGrade", createGrade);
router.get("/getAllGrades", getAllGrades);
router.get("/getGradeById/:id", getGradeById);
router.put("/updateGradeById/:id", updateGradeById);
router.delete("/deleteGradeById/:id", deleteGradeById);

module.exports = router;
