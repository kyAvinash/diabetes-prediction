const dotenv = require("dotenv")
const path = require("path")

// Load env vars
dotenv.config()

module.exports = {
  port: process.env.PORT || 5000,
  mongoURI: process.env.MONGO_URI,
  nodeEnv: process.env.NODE_ENV || "development",
  mlModelPath: path.join(__dirname, "../ml-model"),
  diabetesScalerPath: path.join(__dirname, "../ml-model/diabetes_scaler.joblib"),
  diabetesModelPath: path.join(__dirname, "../ml-model/random_forest_diabetes_model.joblib"),
  pythonPath: process.env.PYTHON_PATH || "python",
}
