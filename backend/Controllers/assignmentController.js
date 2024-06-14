const assignmentModel = require("../Models/Assignment");
const ObjectId = require("mongoose").Types.ObjectId;

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
    } = req.body;

    // Check if all required fields are provided
    if (
      !(
        CreatedBy &&
        assignmentTitle &&
        deadline &&
        totalPoints &&
        assignmentUrl
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

    return res.status(201).send(assignment);
  } catch (error) {
    console.error("Error creating assignment:", error);
    return res.status(500).send("Error creating assignment");
  }
}
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
};
