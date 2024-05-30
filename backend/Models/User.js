const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Teacher"],
      default: "Student",
    },
    performance: {
      exams: [
        {
          exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam" },
          score: Number,
          timeTaken: Number, // time taken to complete the exam in minutes
          date: { type: Date, default: Date.now },
        },
      ],
      assignments: [
        {
          assignment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assignment",
          },
          score: Number,
          date: { type: Date, default: Date.now },
        },
      ],
    },
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
