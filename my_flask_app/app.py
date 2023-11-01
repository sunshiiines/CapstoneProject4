from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS from flask_cors
import os
import pickle

app = Flask(__name__)
CORS(app)  # Enable CORS for your app

# Get the absolute path to the 'model' directory
model_dir = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'model')

# Construct the absolute file path
file_path = os.path.join(model_dir, 'DTC.pkl')

# Load the model using the absolute file path
with open(file_path, 'rb') as model_file:
    dst = pickle.load(model_file)  # Load the model here

# Define a function to classify hypertension status based on the prediction
def hypertension_classification(pre_output):
    hypertension_statuses = {
        0: 'No Hypertension',
        1: 'Blood Pressure Abnormality', 
    }

    if pre_output in hypertension_statuses:
        return hypertension_statuses[pre_output]
    else:
        return 'Unknown'

# input_data = {
#     "input_1": 0,
#     "input_2": 0,
#     "input_3": 0,
#     "input_4": 0,
#     "input_5": 0,
#     "input_6": 0,
#     "input_7": 0,
#     "input_8": 0,
#     "input_9": 0,
#     "input_10": 0,
# }

@app.route('/api/inputs', methods=['GET'])
def get_inputs():
    return jsonify(input_data)

@app.route('/api/predict', methods=['POST'])
def predict():
    # Retrieve input data from the POST request
    data = request.get_json()
    input_data = [float(p_data) for p_data in data.values()]

    # Prepare the input data as a list of lists
    # val_input = [[0.23,54,33,1,0,26106,25333,205.0,3,0]]

    # Make predictions using the loaded model
    prediction = dst.predict([input_data])
    print(prediction)
    pred_class = hypertension_classification(prediction[0])

    return jsonify({'prediction': pred_class})  # Return the prediction as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode
