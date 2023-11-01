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

        patientMeasurements: {
            height: 0,
            weight: 0,
        },

        patientFeatures: {
            age: 30,
            sex: 0,
            bmi: 0,
            fhistory: 0,  // Family history
            hpactivity: 0, // Habit activity
            smoking: 0,
            aconsumption: 0, // Alcohol consumption
            salt: 0,
            stressLevel: 0,
            health: 0, // Chronic kidney diseas
        },
        prediction: null,

        init() {
            console.log('init');
        },

        calaculateBMI(height, weight) {
            // Convert height to meters (from centimeters)
            const heightInMeters = height / 100;

            // Calculate BMI
            const bmi = weight / (heightInMeters * heightInMeters);
            return bmi.toFixed(2);

        },

        predict() {
            // Calculate the patients BMI
            this.patientFeatures.bmi = this.calaculateBMI(this.patientMeasurements.height, this.patientMeasurements.weight);
            console.log(this.patientFeatures);
            // Make a POST request to your Flask app
            axios.post('http://127.0.0.1:5000/api/predict', this.patientFeatures)
                .then(response => {
                    console.log(response.data);
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
