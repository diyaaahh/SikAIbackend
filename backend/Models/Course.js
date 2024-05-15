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
});
const courseModel = mongoose.model("Course", CourseSchema);
module.exports = courseModel;
