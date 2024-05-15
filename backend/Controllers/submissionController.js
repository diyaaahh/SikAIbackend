const Submission = require('../Models/Submission')
const Assignment= require('../Models/Assignment')
const ObjectId = require("mongoose").Types.ObjectId;

async function submitAssignment (req, res) {
    const { assignmentId, studentId, content } = req.body;

    try {
        const assignment = await Assignment.findById(assignmentId);

        if (!assignment) {
            return res.status(404).json({ error: 'Assignment not found' });
        }

        const currentDateTime = new Date();
        let status = "Pending";

        if (currentDateTime <= assignment.deadline) {
            status = "Submitted";
        } else {
            status = "Late submission";
        }

        const submission = new Submission({
            assignmentId,
            studentId,
            content,
            submissionDate: currentDateTime,
            status
        });

        await submission.save();
        res.status(201).json(submission);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//get all submitted assignments of a particular user
async function getSubmittedAssignments (req, res) {
    const { studentId } = req.params;

    try {
        const submissions = await Submission.find({ studentId, 
             status: { $in: ["Submitted", "Late submission"] }})
            .populate('assignmentId')
            .populate('studentId');

        res.status(200).json(submissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//total count of submitted assignments of a particular student
async function countSubmittedAssignments(req, res) {
    const { studentId } = req.params;

    try {
        const count = await Submission.countDocuments({ studentId,
             status: {$in:["Submitted", "Late Submission"]}});

        res.status(200).json({ count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//total count of late submissions of a particular student
async function countLateSubmissions(req, res) {
    const { studentId } = req.params;

    try {
        const count = await Submission.countDocuments({ studentId,
             status:  "Late Submission"});

        res.status(200).json({ count });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// gets the pending assignments of a particular student
async function getPendingAssignments (req, res) {
    const { studentId } = req.params;

    try {
        const pendingSubmissions = await Submission.find({ studentId, status: "Pending" })
            .populate('assignmentId')
            .populate('studentId');

        res.status(200).json(pendingSubmissions);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    submitAssignment, getSubmittedAssignments,getPendingAssignments,
    countSubmittedAssignments,countLateSubmissions
}