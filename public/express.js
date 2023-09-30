// Import necessary libraries and dependencies
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000; // You can change the port number as needed

// Import your machine learning model or prediction function here
// For example, if using a Python model, you can use a library like 'child_process'
const { spawn } = require('child_process');

// Middleware to parse JSON and URL-encoded bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from a directory (e.g., "public")
app.use(express.static('public'));

// Handle GET request to serve an HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html'); // Change the file path as needed
});

// Handle POST request for making predictions
app.post('api/predict', (req, res) => {
  // Retrieve the hypertension attributes from the POST request body
  const {
    Genetic_Pedigree_Coefficient,
    Age,
    BMI,
    Sex,
    Smoking,
    Physical_activity,
    salt_content_in_the_diet,
    alcohol_consumption_per_day,
    Level_of_Stress,
    Chronic_kidney_disease,
  } = req.body;

  // Example: Create an array of input values
  const val_input = [
    Genetic_Pedigree_Coefficient,
    Age,
    BMI,
    Sex,
    Smoking,
    Physical_activity,
    salt_content_in_the_diet,
    alcohol_consumption_per_day,
    Level_of_Stress,
    Chronic_kidney_disease,
  ];

  // Example: Call a Python script to perform the prediction
  const pythonProcess = spawn('python', ['your_prediction_script.py', ...val_input]);

  // Listen for data from the Python script
  pythonProcess.stdout.on('data', (data) => {
    const predictionResult = data.toString().trim();

    // Send the prediction result as a response
    res.json({ prediction: predictionResult });
  });

  // Handle any errors that occur during the prediction process
  pythonProcess.stderr.on('data', (data) => {
    console.error(`Prediction error: ${data}`);
    res.status(500).json({ error: 'Prediction failed' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
