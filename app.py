from flask import Flask, request, jsonify
import pickle
import numpy as np
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS  # This is used to handle CORS if you're running frontend and backend locally

# Initialize Flask app
app = Flask(__name__)

# Enable CORS for all domains (allow requests from frontend running on a different port)
CORS(app)

# Load the trained stacked model from the .pkl file
with open('stack_model.pkl', 'rb') as file:
    stack_model = pickle.load(file)

# Load the scaler (if used during training)
with open('scaler.pkl', 'rb') as scaler_file:
    scaler = pickle.load(scaler_file)

# Define an endpoint for prediction
@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the POST request
    data = request.get_json(force=True)

    # Extract features from the input data
    features = np.array([[
        data['Age'],
        data['Junk_Food'],
        data['Salt'],
        data['Feel_Bad'],
        data['Feel_zeroInt'],
        data['Feel_Hopeless'],
        data['Smoke'],
        data['Colestrol'],
        data['BP'],
        data['Heartdisease_family'],
        data['Animia'],
        data['Diabeties'],
        data['Hypertension'],
        data['Sleepapnea'],
        data['IrregularHeartRhythms'],
        data['CoronaryDisease'],
        data['Angina'],
        data['Take_ColesterolMedication'],
        data['BMI']
    ]])

    # Apply the scaler to the features if it was used during training
    features = scaler.transform(features)

    # Make the prediction using the stacked model
    prediction = stack_model.predict(features)

    # Return the prediction (1 for heart disease, 0 for no heart disease)
    return jsonify({"prediction": int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
