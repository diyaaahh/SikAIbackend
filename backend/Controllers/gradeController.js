const Grade = require("../models/Grade");

const createGrade = async (req, res) => {
  try {
    const newGrade = await Grade.create(req.body);
    res.status(201).json(newGrade);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllGrades = async (req, res) => {
  try {
    const grades = await Grade.find();
    res.status(200).json(grades);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGradeById = async (req, res) => {
  try {
    const grade = await Grade.findById(req.params.id);
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateGradeById = async (req, res) => {
  try {
    const updatedGrade = await Grade.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedGrade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json(updatedGrade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteGradeById = async (req, res) => {
  try {
    const deletedGrade = await Grade.findByIdAndDelete(req.params.id);
    if (!deletedGrade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json({ message: "Grade deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getGradeByStudentId = async (req, res) => {
  try {
    const grade = await Grade.find({ studentId: req.params.studentId }).populate("assignmentId");
    if (!grade) {
      return res.status(404).json({ message: "Grade not found" });
    }
    res.status(200).json(grade);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {

  createGrade,
  getAllGrades,
  getGradeById,
  updateGradeById,
  deleteGradeById,
  getGradeByStudentId
};
