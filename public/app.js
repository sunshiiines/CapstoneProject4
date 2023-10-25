document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        inputData: {
            input_1: 0,
            input_2: 0,
            input_3: 0,
            input_4: 0,
            input_5: 0,
            input_6: 0,
            input_7: 0,
            input_8: 0,
            input_9: 0,
            input_10: 0
        },
        prediction: null,

        init() {
            console.log('init');
        },

        predict() {
            console.log('Sending request with input data:', this.inputData);
            // Make a POST request to your Flask app
            axios.post('http://127.0.0.1:5000/api/predict', this.inputData)
                .then(response => {
                    this.prediction = response.data.prediction;
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.prediction = 'Error occurred during prediction.';
                });
        },

        // Function to fetch input data
        fetchInputs() {
            axios.get('http://127.0.0.1:5000/api/inputs')
                .then(response => {
                    this.inputData = response.data;
                })
                .catch(error => {
                    console.error('Error fetching input data:', error);
                });
        }
    }));
});
