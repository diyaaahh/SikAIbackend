const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
app.use(express.json());

//cors
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL
  methods: ["GET", "POST"], // Allowed HTTP methods
  allowedHeaders: ["Content-Type"], // Allowed headers
};

app.use(cors(corsOptions));
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
const courseRoutes = require("./Routes/CourseRoutes");
const materialRoutes = require("./Routes/MaterialRoutes");
const chapterRoutes = require("./Routes/chapterRoutes");
const StudentTrackerRoutes = require("./Routes/StudentTrackerRoutes");


app.use("/auth", userRoutes);
app.use("/assignment", assignmentRoutes);
app.use("/submission", submissionRoutes);
app.use("/exam", examRoutes);
app.use("/score", scoreRoutes);
app.use("/performance", performanceRoutes);
app.use("/course", courseRoutes);
app.use("/material", materialRoutes);
app.use("/chapter", chapterRoutes);
app.use("/studenttracker", StudentTrackerRoutes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
