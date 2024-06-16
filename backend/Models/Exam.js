const mongoose = require("mongoose");
// Create a schema for the questions
const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  correctAns: { type: String },
  topicName: {
    type:'String',
    required: true
  }
});

const examSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    }, // Exam title
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    questions: [questionSchema],
    passMarks:{
      type: Number,
      default:0
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);
