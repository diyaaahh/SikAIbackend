const Chapter = require('../Models/Chapter.js')

const createChapter = async (req, res) => {
    try {
      const newChapter = await Chapter.create(req.body);
      res.status(201).json(newChapter);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteChapterbyId = async (req,res) => {
    try {
        const deletedChapter = await Chapter.findByIdAndDelete(req.params.id);
        if (!deletedChapter) {
          return res.status(404).json({ message: "Chapter not found" });
        }
        res.status(200).json({ message: "Chapter deleted successfully" });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}

module.exports={createChapter, deleteChapterbyId}