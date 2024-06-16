const assignmentModel = require("../Models/Assignment");
const ObjectId = require("mongoose").Types.ObjectId;
const Chapter = require("../Models/Chapter")

// Controller to create an assignment
async function createAssignment(req, res) {
  try {
    const {
      CreatedBy,
      assignmentTitle,
      description,
      deadline,
      totalPoints,
      assignmentUrl,
      chapterId, // Include chapterId in the request body
    } = req.body;

    // Check if all required fields are provided
    if (
      !(
        CreatedBy &&
        assignmentTitle &&
        deadline &&
        totalPoints &&
        assignmentUrl &&
        chapterId // Ensure chapterId is provided
      )
    ) {
      return res.status(400).send("All required fields must be provided");
    }

    // Create new assignment
    const assignment = await assignmentModel.create({
      CreatedBy,
      assignmentUrl,
      assignmentTitle,
      description: description || "", // If description is not provided, default to empty string
      deadline,
      totalPoints,
    });

    // Update the chapter to include the new assignment
    const chapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { $push: { assignment: assignment._id } }, // Push the assignment ID into the assignment array
      { new: true, useFindAndModify: false }
    );

    if (!chapter) {
      return res.status(404).send("Chapter not found");
    }

    return res.status(201).send({ assignment, chapter });
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(500).send("Error creating assignment");
  }
}

// Getting chapter specific assignments
const getChapterAssignments = async (req, res) => {
  const { chapterId } = req.params;

  try {
    const chapter = await Chapter.findById(chapterId).populate('assignment');

    if (!chapter) {
      return res.status(404).json({ message: 'Chapter not found' });
    }

    return res.status(200).json({ assignments: chapter.assignment });
  } catch (error) {
    console.error('Error fetching chapter assignments:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};
// Controller to edit an assignment
async function editAssignment(req, res) {
  try {
    const { assignmentId } = req.params;
    const { assignmentTitle, description, deadline, totalPoints } = req.body;

    // Check if assignmentId is provided
    if (!assignmentId) {
      return res.status(400).send("Assignment ID must be provided");
    }

    // Find the assignment by ID and update its fields
    const updatedAssignment = await assignmentModel.findByIdAndUpdate(
      assignmentId,
      {
        assignmentTitle,
        description: description || "", // If description is not provided, default to empty string
        deadline,
        totalPoints,
      },
      { new: true }
    ); // { new: true } option returns the updated document

    if (!updatedAssignment) {
      return res.status(404).send("Assignment not found");
    }

    return res.status(200).send(updatedAssignment);
  } catch (error) {
    console.error("Error editing assignment:", error);
    return res.status(500).send("Error editing assignment");
  }
}

module.exports = {
  createAssignment,
  editAssignment,
  getChapterAssignments
};
