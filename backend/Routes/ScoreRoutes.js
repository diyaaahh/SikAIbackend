const {storeScores, getScore} = require("../Controllers/scoreController")
const express = require("express");
const router = express.Router()

router.post('/', storeScores);
router.get('/:userId/:examId', getScore)

module.exports = router;