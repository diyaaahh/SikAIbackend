const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

const PORT = 3000;

const connectionString = process.env.MONGOCONNECTION;

mongoose.connect(
  "mongodb+srv://diyaneupane:1234567890@sikai.jotrerj.mongodb.net/"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const userRoutes = require("./Routes/UserRoutes");
const assignmentRoutes = require("./Routes/AssignmentRoutes");
const submissionRoutes = require("./Routes/SubmissionRoutes");
const examRoutes = require("./Routes/ExamRoutes");
const performanceRoutes = require("./Routes/performanceRoutes");

app.use("/auth", userRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/submission", submissionRoutes);
app.use("/exams", examRoutes);
app.use("/performance", performanceRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
