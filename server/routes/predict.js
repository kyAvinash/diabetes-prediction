const express = require("express")
const router = express.Router()
const { makePrediction } = require("../controllers/predictController")

// @route   POST /api/predict
// @desc    Make diabetes prediction
router.post("/", makePrediction)

module.exports = router
