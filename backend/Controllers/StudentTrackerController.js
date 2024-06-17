const StudentTracker = require("../Models/StudentTracker");
const mongoose = require("mongoose");

async function getAllStudentTrackers(req, res) {
  try {
    const studentTrackers = await StudentTracker.find({}).populate("userId");
    return res.status(200).json(studentTrackers);
  } catch (error) {
    console.error("Error fetching student trackers:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function addStudentTracker(req, res) {
    try {
        const newStudentTracker = new StudentTracker(req.body);
        await newStudentTracker.save();
        return res.status(201).json(newStudentTracker);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function getStudentTracker(req, res) {

    const { id, courseId } = req.params;
    console.log(id);
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }
        
        const studentTracker = await StudentTracker.findOne({ userId: id, courseId: courseId});

        if (!studentTracker) {
            return res.status(404).json({ message: 'Student tracker not found' });
        }
        return res.status(200).json(studentTracker);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function updateStudentTracker(req, res) {
    try {
        const { id, courseId } = req.params;
        const updateData = req.body;

        // Ensure the id is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid user ID format' });
        }

        let studentTracker = await StudentTracker.findOne({ userId: id , courseId: courseId});
        if (!studentTracker) {
            return res.status(404).json({ message: 'Student tracker not found' });
        }

        // Update each field by adding incoming data to the existing values
        for (const key in updateData) {
            if (Object.prototype.hasOwnProperty.call(updateData, key)) {
                if (Array.isArray(studentTracker[key])) {
                    // Handle arrays (like assignmentTracker, readingMaterialTracker, examTracking)
                    if (Array.isArray(updateData[key])) {
                        // Update array of subdocuments
                        updateData[key].forEach((item) => {
                            const existingItem = studentTracker[key].find(existing => existing._id.equals(item._id));
                            if (existingItem) {
                                // Add to existing values
                                Object.keys(item).forEach(subKey => {
                                    if (subKey !== '_id') {
                                        existingItem[subKey] += item[subKey];
                                    }
                                });
                            } else {
                                // Add new item if not already present
                                studentTracker[key].push(item);
                            }
                        });
                    }
                } else {
                    // Handle scalar fields (like courseCardClicks, coursePdfDownloads, etc.)
                    studentTracker[key] += updateData[key];
                }
            }
        }

        // Calculate totalTimeSpent
        studentTracker.totalTimeSpent = studentTracker.courseTimeSpent;
        studentTracker.assignmentTracker.forEach(assignment => {
            studentTracker.totalTimeSpent += assignment.timeSpent;
        });

        // Save the updated tracker
        studentTracker = await studentTracker.save();
        return res.status(200).json(studentTracker);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { addStudentTracker, getStudentTracker, updateStudentTracker };
