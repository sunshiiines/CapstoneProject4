document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        // Initialize your form fields as variables
        Genetic_Pedigree_Coefficient: '',
        Age: 0,
        Height: 0,
        Weight: 0,
        Sex: 0,
        Smoking: 0,
        Physical_activity: 0,
        salt_content_in_the_diet: 0,
        alcohol_consumption_per_day: 0,
        stress_levels: 0,
        Chronic_kidney_disease: 0,

        predictionResult: '',

        init() {
            console.log('init');
        },
        predict() {
            // Prepare the data to be sent to your Flask API
            const inputData = {
                Age: this.Age,
                Sex: this.Sex,
                Height: this.Height,
                Weight: this.Weight,
                Smoking: this.Smoking,
                Physical_activity: this.Physical_activity,
                salt_content_in_the_diet: this.salt_content_in_the_diet,
                alcohol_consumption_per_day: this.alcohol_consumption_per_day,
                stress_levels: this.stress_levels,
                Chronic_kidney_disease: this.Chronic_kidney_disease,
            }    

            // Make a POST request to your Flask API
            axios.post('your_api_endpoint', inputData)
                .then(response => {
                    this.predictionResult = response.data.prediction;
                })
                .catch(error => {
                    console.error('Error:', error);
                    this.predictionResult = 'Error occurred during prediction.';
                });
        }
    }));
});
















