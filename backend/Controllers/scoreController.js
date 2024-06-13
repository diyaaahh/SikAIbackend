
const Score = require("../Models/Score"); // Assuming you have a Score model

const storeScores = async  (req, res) => {
  const { examId, userId, score } = req.body;

  try {
    const newScore = new Score({ examId, userId, score });
    await newScore.save();
    res.status(201).json({ message: "Score saved successfully" });
    return score;
  } catch (error) {
    res.status(500).json({ message: "Error saving score", error });
  }
};

module.exports = storeScores;
