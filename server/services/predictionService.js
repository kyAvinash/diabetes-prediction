const { spawn } = require("child_process")
const path = require("path")
const config = require("../config/config")

// Function to predict diabetes using Python ML model
exports.predictDiabetes = async (inputData) => {
  return new Promise((resolve, reject) => {
    try {
      // Spawn Python process
      const pythonProcess = spawn(config.pythonPath, [
        path.join(config.mlModelPath, "model_service.py"),
        ...inputData.map(String),
      ])

      let result = ""
      let error = ""

      // Collect data from script
      pythonProcess.stdout.on("data", (data) => {
        result += data.toString()
      })

      pythonProcess.stderr.on("data", (data) => {
        error += data.toString()
      })

      // Handle process completion
      pythonProcess.on("close", (code) => {
        if (code !== 0) {
          console.error(`Python process exited with code ${code}`)
          console.error(`Error: ${error}`)
          return resolve({
            success: false,
            error: "ML model execution failed",
          })
        }

        try {
          // Parse the result
          const parsedResult = JSON.parse(result)
          return resolve({
            success: true,
            prediction: parsedResult.prediction,
            probability: parsedResult.probability,
          })
        } catch (parseError) {
          console.error("Error parsing prediction result:", parseError)
          return resolve({
            success: false,
            error: "Failed to parse prediction result",
          })
        }
      })
    } catch (error) {
      console.error("Error in prediction service:", error)
      return resolve({
        success: false,
        error: "Prediction service error",
      })
    }
  })
}
