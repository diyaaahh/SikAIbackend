const mongoose = require("mongoose");
const { Schema } = mongoose;

const TeacherTrackingSchema = new Schema({
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courseCardClicks: {
    type: Number,
    default: 0,
  },
  coursePdfDownloads: {
    type: Number,
    default: 0,
  },
  coursePdfSummarized: {
    type: Number,
    default: 0,
  },
});
const materialModel = mongoose.model("Material", TeacherTrackingSchema);
module.exports = materialModel;
