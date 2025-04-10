const express = require("express")
const router = express.Router()
const { getAllData, addData } = require("../controllers/dataController")

// @route   GET /api/data
// @desc    Get all user data
router.get("/", getAllData)

// @route   POST /api/data
// @desc    Add user data
router.post("/", addData)

module.exports = router
