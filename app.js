function predict() {
    // JSON object with input data
    const inputData = {
        "input_1": parseFloat(0),
        "input_2": parseFloat(0),
        "input_3": parseFloat(0),
        "input_4": parseFloat(0),
        "input_5": parseFloat(0),
        "input_6": parseFloat(0),
        "input_7": parseFloat(0),
        "input_8": parseFloat(0),
        "input_9": parseFloat(0),
        "input_10": parseFloat(0)

    };

    // Make a POST request to your Flask app
    fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // body: JSON.stringify(inputData)
    })
        .then(response => response.json())
        .then(data => {
            // Update the prediction result
            console.log(data);
            this.prediction = data.prediction;
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

predict()