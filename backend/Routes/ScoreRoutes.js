const {storeScores, getScore, getScoresByStudentId} = require("../Controllers/scoreController")
const express = require("express");
const router = express.Router()

router.post('/', storeScores);
router.get('/:userId/:examId', getScore);
router.get('/:studentId', getScoresByStudentId);

module.exports = router;