const HttpStatus = require("../constant/constants.js");
const asyncErrorHandler = require("../utils/asyncHandler.js");
const throwError = require("../utils/throwError.js");
const sendSuccessResponse = require("../helper/apiResponseHandler.js");
const User = require("../Models/User.js");

const getStudentPerformance = asyncErrorHandler(async (req, res) => {
  const userID = req.params.userID;

  if (!userID) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "User ID is required",
    });
  }

  const user = await User.findById(userID)
    .populate({
      path: "exams",
      select: "title subject date score",
    })
    .populate({
      path: "assignments",
      select: "assignmentTitle subject deadline score",
    })
    .populate({
      path: "grades",
      select: "exam assignment score date",
    });

  if (!user) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "User not found",
    });
  }

  const sortedExams = user.exams.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );
  const sortedAssignments = user.assignments.sort(
    (a, b) => new Date(b.deadline) - new Date(a.deadline)
  );

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "Student performance retrieved successfully",
    data: {
      exams: sortedExams,
      assignments: sortedAssignments,
      grades: user.grades,
    },
  });
});

const getTeacherOverview = asyncErrorHandler(async (req, res) => {
  const teacherID = req.params.teacherID;

  if (!teacherID) {
    throwError({
      statusCode: HttpStatus.BAD_REQUEST,
      message: "Teacher ID is required",
    });
  }

  const students = await User.find({ role: "student" })
    .populate({
      path: "exams",
      select: "title subject date score",
    })
    .populate({
      path: "assignments",
      select: "assignmentTitle subject deadline score",
    })
    .populate({
      path: "grades",
      select: "exam assignment score date",
    });

  if (!students) {
    throwError({
      statusCode: HttpStatus.NOT_FOUND,
      message: "No students found",
    });
  }

  const sortedStudents = sortStudentsByPerformance(students);

  sendSuccessResponse({
    res,
    statusCode: HttpStatus.OK,
    message: "Teacher overview retrieved successfully",
    data: sortedStudents,
  });
});

module.exports = {
  getStudentPerformance,
  getTeacherOverview,
};

/*
!Student Performance
{
  "exams": [
    {
      "title": "Math Midterm Exam",
      "subject": "Mathematics",
      "date": "2024-05-15T10:00:00.000Z",
      "score": 85
    },
    {
      "title": "English Essay Exam",
      "subject": "English",
      "date": "2024-05-20T13:00:00.000Z",
      "score": 75
    }
  ],
  "assignments": [
    {
      "assignmentTitle": "History Research Paper",
      "subject": "History",
      "deadline": "2024-06-05T23:59:59.000Z",
      "score": 90
    },
    {
      "assignmentTitle": "Science Lab Report",
      "subject": "Science",
      "deadline": "2024-06-10T23:59:59.000Z",
      "score": 80
    }
  ],
  "grades": [
    {
      "exam": "Math Midterm Exam",
      "assignment": "History Research Paper",
      "score": 85,
      "date": "2024-05-20T15:00:00.000Z"
    },
    {
      "exam": "English Essay Exam",
      "assignment": "Science Lab Report",
      "score": 75,
      "date": "2024-05-25T14:00:00.000Z"
    }
  ],
  "averageExamScore": 80,
  "averageAssignmentScore": 85,
  "examScoresChartData": {
    "labels": ["Math Midterm Exam", "English Essay Exam"],
    "data": [85, 75]
  },
  "assignmentScoresChartData": {
    "labels": ["History Research Paper", "Science Lab Report"],
    "data": [90, 80]
  },
  "gradeChartData": {
    "labels": ["Math Midterm Exam", "English Essay Exam"],
    "data": [85, 75]
  }
}
!Teacher Overview
[
  {
    "name": "Student 1",
    "email": "student1@example.com",
    "exams": [
      {
        "title": "Math Midterm Exam",
        "subject": "Mathematics",
        "date": "2024-05-15T10:00:00.000Z",
        "score": 85
      }
    ],
    "assignments": [
      {
        "assignmentTitle": "History Research Paper",
        "subject": "History",
        "deadline": "2024-06-05T23:59:59.000Z",
        "score": 90
      }
    ],
    "grades": [
      {
        "exam": "Math Midterm Exam",
        "assignment": "History Research Paper",
        "score": 85,
        "date": "2024-05-20T15:00:00.000Z"
      }
    ],
    "averageExamScore": 85,
    "averageAssignmentScore": 90
  },
  {
    "name": "Student 2",
    "email": "student2@example.com",
    "exams": [
      {
        "title": "English Essay Exam",
        "subject": "English",
        "date": "2024-05-20T13:00:00.000Z",
        "score": 75
      }
    ],
    "assignments": [
      {
        "assignmentTitle": "Science Lab Report",
        "subject": "Science",
        "deadline": "2024-06-10T23:59:59.000Z",
        "score": 80
      }
    ],
    "grades": [
      {
        "exam": "English Essay Exam",
        "assignment": "Science Lab Report",
        "score": 75,
        "date": "2024-05-25T14:00:00.000Z"
      }
    ],
    "averageExamScore": 75,
    "averageAssignmentScore": 80
  }
]




*/
// assignment class monitoring and automated tutorial tracking
// add certain time to complete the assignment
// tabs out logic in exams

// suggest student to go through certain chapters again if they score below certain marks
// add a feature to track the time spent on the assignment
//questions and tags in the assesment and exam
