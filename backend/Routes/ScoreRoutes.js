const storeScores = require("../Controllers/scoreController")
const express = require("express");
const router = express.Router()

router.post('/', storeScores)

module.exports = storeScores