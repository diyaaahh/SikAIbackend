const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

//cors
const cors = require("cors");
app.use(cors());

const PORT = 3000;

const connectionString = process.env.MONGOCONNECTION;

mongoose.connect(
  "mongodb+srv://b33b3k:b33b3k@cluster0.fwqzwpw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", (req, res) => {
  res.send("Welcome to SikAI Backend");
});
const userRoutes = require("./Routes/UserRoutes");
const assignmentRoutes = require("./Routes/AssignmentRoutes");
const submissionRoutes = require("./Routes/SubmissionRoutes");
const examRoutes = require("./Routes/ExamRoutes");
const scoreRoutes = require("./Routes/ScoreRoutes");
const performanceRoutes = require("./Routes/performanceRoutes");

app.use("/auth", userRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/submission", submissionRoutes);
app.use("/exams", examRoutes);
app.use("/score", scoreRoutes);
app.use("/performance", performanceRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
