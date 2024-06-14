const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chapter: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Chapter",
  },
  student: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
});
const courseModel = mongoose.model("Course", CourseSchema);
module.exports = courseModel;
