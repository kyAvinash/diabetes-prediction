import sys
import os
import json
import joblib
import numpy as np

def load_model_and_scaler():
    """Load the trained model and scaler"""
    try:
        # Get the directory of this script
        script_dir = os.path.dirname(os.path.abspath(__file__))
        
        # Load the scaler
        scaler_path = os.path.join(script_dir, 'diabetes_scaler.joblib')
        scaler = joblib.load(scaler_path)
        
        # Load the model
        model_path = os.path.join(script_dir, 'random_forest_diabetes_model.joblib')
        model = joblib.load(model_path)
        
        return model, scaler
    except Exception as e:
        print(json.dumps({
            "error": f"Failed to load model or scaler: {str(e)}"
        }))
        sys.exit(1)

def predict_diabetes(input_data):
    """Make a prediction using the loaded model"""
    try:
        # Load model and scaler
        model, scaler = load_model_and_scaler()
        
        # Convert input to numpy array and reshape
        input_array = np.array(input_data).astype(float).reshape(1, -1)
        
        # Scale the input data
        scaled_input = scaler.transform(input_array)
        
        # Make prediction
        prediction_proba = model.predict_proba(scaled_input)[0]
        prediction = int(prediction_proba[1] > 0.5)  # 1 if probability > 0.5 else 0
        
        # Return prediction and probability
        result = {
            "prediction": prediction,
            "probability": float(prediction_proba[1])
        }
        
        print(json.dumps(result))
        return result
    except Exception as e:
        print(json.dumps({
            "error": f"Prediction failed: {str(e)}"
        }))
        sys.exit(1)

if __name__ == "__main__":
    # Get input data from command line arguments
    if len(sys.argv) < 9:
        print(json.dumps({
            "error": "Not enough input parameters"
        }))
        sys.exit(1)
    
    try:
        # Parse input data
        input_data = [float(arg) for arg in sys.argv[1:9]]
        predict_diabetes(input_data)
    except Exception as e:
        print(json.dumps({
            "error": f"Input data processing failed: {str(e)}"
        }))
        sys.exit(1)
