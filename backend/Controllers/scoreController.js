
const Score = require("../Models/Score"); // Assuming you have a Score model

const storeScores = async  (req, res) => {
  const { examId, userId, score,status} = req.body;

  try {
    const newScore = new Score({ examId, userId, score ,status});
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully" });
    return score;
  } catch (error) {
    res.status(500).json({ message: "Error saving score", error });
  }
};

const getScore = async (req, res) => {
  const { userId, examId } = req.params;
  
  try {
    const score = await Score.findOne({ userId, examId });
    if (!score) {
      return res.status(404).json({ message: 'Score not found' });
    }
    res.status(200).json(score);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {storeScores, getScore};
