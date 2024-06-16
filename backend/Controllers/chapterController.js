const Chapter = require("../Models/Chapter.js");

const createChapter = async (req, res) => {
  try {
    const newChapter = await Chapter.create(req.body);
    res.status(201).json(newChapter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
//get chapter by id
const getChapterbyId = async (req, res) => {
  try {
    const chapter = await Chapter.findById(req.params.id)
      .populate("material")
      .populate("assignment")
      .populate("exam");
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteChapterbyId = async (req, res) => {
  try {
    const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
    if (!deletedChapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    res.status(200).json({ message: "Chapter deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add material
const addMaterial = async (req, res) => {
  try {
    const material = req.body;
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    chapter.material.push(material);
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add assignment
const addAssignment = async (req, res) => {
  try {
    const assignment = req.body;
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    chapter.assignment.push(assignment);
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//add quiz
const addQuiz = async (req, res) => {
  try {
    const quiz = req.body;
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) {
      return res.status(404).json({ message: "Chapter not found" });
    }
    chapter.quiz.push(quiz);
    await chapter.save();
    res.status(200).json(chapter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createChapter,
  deleteChapterbyId,
  addMaterial,
  addAssignment,
  addQuiz,
  getChapterbyId,
};
