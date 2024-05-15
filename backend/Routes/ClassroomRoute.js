const router = require("express").Router();

const {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
} = require("../Controllers/classroomController");

router.post("/createClassroom", createClassroom);
router.get("/getAllClassrooms", getAllClassrooms);
router.get("/getClassroomById/:id", getClassroomById);
router.put("/updateClassroomById/:id", updateClassroomById);
router.delete("/deleteClassroomById/:id", deleteClassroomById);

module.exports = router;
