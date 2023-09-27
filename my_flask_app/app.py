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

@app.post('/api/predict')
def predict():
    # Load Saved Extra Tree model
    with open('model/DTC (1).pkl', 'rb') as model_file:
        dst = pickle.load(model_file)
        
    # Retrieve input data from the POST request
    input_1 = float(request.form.get('input_1'))
    input_2 = float(request.form.get('input_2'))
    input_3 = float(request.form.get('input_3'))
    input_4 = float(request.form.get('input_4'))
    input_5 = float(request.form.get('input_5'))
    input_6 = float(request.form.get('input_6'))
    input_7 = float(request.form.get('input_7'))
    input_8 = float(request.form.get('input_8'))
    input_9 = float(request.form.get('input_9'))
    input_10 = float(request.form.get('input_10'))

    # Prepare the input data as a list of lists
    val_input = [[input_1, input_2, input_3, input_4, input_5, input_6, input_7, input_8, input_9, input_10]]
    # val_input = [[0.23,54,33,1,0,26106,25333,205.0,3,0]]
       
    # Make predictions using the loaded model
    prediction = dst.predict(val_input)
    pred_class = hypertension_classification(prediction[0])
   
    return jsonify({'prediction': pred_class})  # Return the prediction as JSON

if __name__ == '__main__':
    app.run(debug=True)  # Run the Flask app in debug mode
