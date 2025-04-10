const UserData = require("../models/UserData")

// @desc    Get all user data
// @route   GET /api/data
// @access  Public
exports.getAllData = async (req, res) => {
  try {
    const data = await UserData.find().sort({ createdAt: -1 })

    return res.status(200).json({
      success: true,
      count: data.length,
      data: data,
    })
  } catch (error) {
    console.error("Error fetching data:", error)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    })
  }
}

// @desc    Add user data
// @route   POST /api/data
// @access  Public
exports.addData = async (req, res) => {
  try {
    const {
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age,
      outcome,
      probability,
    } = req.body

    // Validate input
    if (
      pregnancies === undefined ||
      glucose === undefined ||
      bloodPressure === undefined ||
      skinThickness === undefined ||
      insulin === undefined ||
      bmi === undefined ||
      diabetesPedigreeFunction === undefined ||
      age === undefined
    ) {
      return res.status(400).json({
        success: false,
        error: "Please provide all required fields",
      })
    }

    // Create new user data
    const userData = new UserData({
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age,
      outcome,
      probability,
    })

    // Save to database
    await userData.save()

    return res.status(201).json({
      success: true,
      data: userData,
    })
  } catch (error) {
    console.error("Error adding data:", error)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    })
  }
}
