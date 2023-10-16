// document.addEventListener('alpine:init', () => {
//         Alpine.data('app', () => ({
//             // Initialize your form fields as variables here (e.g., Age, Sex, Height, Weight, etc.)
//              Genetic_Pedigree_Coefficient: '',
//   Age: 0,
//   Height: 0,
//   Weight: 0,
//   Sex: 0,
//   Smoking: 0,
//   Physical_activity: 0,
//   salt_content_in_the_diet: 0,
//   alcohol_consumption_per_day: 0,
//   stress_levels: 0,
//   Chronic_kidney_disease: 0,

//             // ... (add other form fields here)

//             predictionResult: '',

//             predict() {
//                 // Prepare the data to be sent to your Flask API
//                 const inputData = {
//                     Age: this.Age,
//                     Sex: this.Sex,
//                     Height: this.Height,
//                     Weight: this.Weight,
//                     // ... (add other form fields here)
//                 };

//                 // Make a POST request to your Flask API
//                 axios.post('your_api_endpoint', inputData)
//                     .then(response => {
//                         this.predictionResult = response.data.prediction;
//                     })
//                     .catch(error => {
//                         console.error('Error:', error);
//                         this.predictionResult = 'Error occurred during prediction.';
//                     });
//             }
//         }));
//     });
















