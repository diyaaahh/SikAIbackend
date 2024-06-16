const { Router } = require("express");
const { getChapterExams } = require("../Controllers/assignmentController");
const examController = require("../Controllers/examController");

const examRoutes = Router();

examRoutes
  .route("/")
  .post(examController.createExam)
  .get(examController.getAllExams)
  .patch()
  .delete();

examRoutes
  .route("/:examID")
  .post()
  .get(examController.getExamById)
  .patch(examController.updateExamDetails)
  .delete(examController.deleteExam);

examRoutes
  .route("/:examID/questions")
  .post(examController.addQuestionToExam)
  .get()
  .patch(examController.updateQuestionDetails)
  .delete(examController.deleteQuestionFromExam);

  examRoutes
  .route("/getchapterexams/:chapterId")
  .get(examController.getChapterExams)
module.exports = examRoutes;
