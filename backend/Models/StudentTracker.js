const mongoose = require("mongoose");
const { Schema } = mongoose;

const StudentTrackerSchema = new Schema({
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
  totalTimeSpent: {
    type: Number,
    default: 0,
  },
  assignmentTracker: {
    type: [
      {
        assignmentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Assignment",
        },
        isClicked: {
          type: Boolean,
          default: false,
        },
        timeSpent: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
  readingMaterialTracker: {
    type: [
      {
        materialId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        isClicked: {
          type: Boolean,
          default: false,
        },
        timeSpent: {
          type: Number,
          default: 0,
        },
      },
    ],
  },
});
const materialModel = mongoose.model("Material", StudentTrackerSchema);
