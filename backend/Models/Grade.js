const mongoose = require("mongoose");
const { Schema } = mongoose;

const GradeSchema = new Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  score: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
    default: "",
  },
  date: { type: Date, default: Date.now },
});
const gradeModel = mongoose.model("Grade", GradeSchema);
module.exports = gradeModel;
