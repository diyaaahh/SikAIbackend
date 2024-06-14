const mongoose = require("mongoose");
const { Schema } = mongoose;

const AssignmentSchema = new Schema({
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  assignmentUrl: {
    type: String,
    required: true,
  },
  assignmentTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  deadline: {
    type: Date,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  publishedAt: {
    type: Date,
    default: Date.now,
  },
  subject: String,
  dueDate: Date,
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});
const assignmentModel = mongoose.model("Assignment", AssignmentSchema);
module.exports = assignmentModel;
