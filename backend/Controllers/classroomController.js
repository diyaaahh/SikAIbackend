const Classroom = require("../Models/Classroom");

const createClassroom = async (req, res) => {
  try {
    const newClassroom = await Classroom.create(req.body);
    res.status(201).json(newClassroom);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find();
    res.status(200).json(classrooms);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getClassroomById = async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json(classroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateClassroomById = async (req, res) => {
  try {
    const updatedClassroom = await Classroom.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json(updatedClassroom);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteClassroomById = async (req, res) => {
  try {
    const deletedClassroom = await Classroom.findByIdAndDelete(req.params.id);
    if (!deletedClassroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }
    res.status(200).json({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createClassroom,
  getAllClassrooms,
  getClassroomById,
  updateClassroomById,
  deleteClassroomById,
};
