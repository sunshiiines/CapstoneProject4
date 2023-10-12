from flask import Flask, request, jsonify  # Import necessary modules
import pickle

app = Flask(__name__)

# Define a function to classify hypertension status based on the prediction
def hypertension_classification(pre_output):
    hypertension_statuses = {
        0: 'No Hypertension/Blood_Pressure_Abnormality',
        1: 'Blood_Pressure_Abnormality',
    }

    if pre_output in hypertension_statuses:
        return hypertension_statuses[pre_output]
    else:
        return 'Unknown'

@app.route('/api/predict', methods=['POST'])
def predict():
    # Load Saved Extra Tree model
    with open('my_flask_app\model\DTC.pkl', 'rb') as model_file:
        dst = pickle.load(model_file)
    # Retrieve input data from the POST request
    data = request.get_json()
    input_data  = [float(p_data) for p_data in data.values()]


    # Prepare the input data as a list of lists
    # val_input = [[0.23,54,33,1,0,26106,25333,205.0,3,0]]
       
    # Make predictions using the loaded model
    prediction = dst.predict([input_data])
    pred_class = hypertension_classification(prediction[0])
   
    return jsonify({'prediction': pred_class})  # Return the prediction as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode

