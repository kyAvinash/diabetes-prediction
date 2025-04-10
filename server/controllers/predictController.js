const { spawn } = require("child_process")
const path = require("path")
const config = require("../config/config")
const predictionService = require("../services/predictionService")
const UserData = require("../models/UserData")

// @desc    Make diabetes prediction
// @route   POST /api/predict
// @access  Public
exports.makePrediction = async (req, res) => {
  try {
    const { pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age } = req.body

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

    // Prepare input data for prediction
    const inputData = [pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, diabetesPedigreeFunction, age]

    // Make prediction using the service
    const result = await predictionService.predictDiabetes(inputData)

    if (!result.success) {
      return res.status(500).json({
        success: false,
        error: result.error || "Prediction failed",
      })
    }

    // Save prediction to database
    const userData = new UserData({
      pregnancies,
      glucose,
      bloodPressure,
      skinThickness,
      insulin,
      bmi,
      diabetesPedigreeFunction,
      age,
      outcome: result.prediction,
      probability: result.probability,
    })

    await userData.save()

    return res.status(200).json({
      success: true,
      prediction: result.prediction,
      probability: result.probability,
    })
  } catch (error) {
    console.error("Error making prediction:", error)
    return res.status(500).json({
      success: false,
      error: "Server Error",
    })
  }
}
