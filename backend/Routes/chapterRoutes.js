//chapter routes
const express = require("express");
const router = express.Router();
const {
  createChapter,
  deleteChapterbyId,
  addMaterial,
  addAssignment,
  addQuiz,
  getChapterbyId,
} = require("../Controllers/chapterController");

router.get("/getChapterById/:id", getChapterbyId);
router.post("/createChapter", createChapter);
router.delete("/deleteChapterbyId/:id", deleteChapterbyId);
router.post("/addMaterial/:id", addMaterial);
router.post("/addAssignment/:id", addAssignment);
router.post("/addQuiz/:id", addQuiz);

module.exports = router;
