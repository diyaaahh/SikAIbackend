const mongoose = require("mongoose");
const { Schema } = mongoose;

const CourseSchema = new Schema({
  chapterName: {
    type: String,
    required: true,
  },
  material: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Material",
  },
  assignment: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Assignment",
  },
  exam: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Exam",
  },
});
const courseModel = mongoose.model("Chapter", CourseSchema);
module.exports = courseModel;
