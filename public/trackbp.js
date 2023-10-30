document.addEventListener("alpine:init", () => {
    Alpine.data("app", () => {
      return {
        systolic: null,
        diastolic: null,
        pulse: null,
        chartData: false,
        labels: [],
        systolicData: [],
        diastolicData: [],
        pulseData: [],

        // Function to add a reading
        addReading() {
          if (this.systolic === null || this.diastolic === null || this.pulse === null) {
            alert("Please fill in all fields.");
            return;
          }

          // Create a new reading
          const newReading = {
            systolic: this.systolic,
            diastolic: this.diastolic,
            pulse: this.pulse,
            id: this.labels.length + 1,
          };

          // Add data to arrays
          this.labels.push(`Day ${newReading.id}`);
          this.systolicData.push(newReading.systolic);
          this.diastolicData.push(newReading.diastolic);
          this.pulseData.push(newReading.pulse);

          // Update the chart with the new data
          this.updateChart();

          // Send data to the server using Axios POST request
          axios.post('/api/tracking', newReading)
            .then((response) => {
              console.log('Added new reading:', response.data);
            })
            .catch((error) => {
              console.error('Error adding tracking data:', error);
            });
        },

        // Function to fetch data from the server
        getReadings() {
          axios.get('/api/tracking')
            .then((response) => {
              if (response.data) {
                this.labels = response.data.map((item, index) => `Day ${index + 1}`);
                this.systolicData = response.data.map(item => item.systolic);
                this.diastolicData = response.data.map(item => item.diastolic);
                this.pulseData = response.data.map(item => item.pulse);
                this.updateChart();
                this.chartData = true;
              }
            })
            .catch((error) => {
              console.error('Error fetching tracking data:', error);
            });
        },

        // Function to update the chart
        updateChart() {
          var ctx = document.getElementById('hypertension-chart').getContext('2d');
          var myChart = new Chart(ctx, {
            type: 'line',
            data: {
              labels: this.labels,
              datasets: [
                {
                  label: 'Systolic',
                  data: this.systolicData,
                  borderColor: 'red',
                },
                {
                  label: 'Diastolic',
                  data: this.diastolicData,
                  borderColor: 'blue',
                },
                {
                  label: 'Pulse',
                  data: this.pulseData,
                  borderColor: 'green',
                },
              ],
            },
          });
        },
         // Function to load initial data (you can call this in your x-init)
         loadData() {
            axios.get('/api/tracking') // Replace with your actual endpoint
            .then((response) => {
                // Assuming your server returns an array of data
                const data = response.data;

                if (data && data.length > 0) {
                    // Extract and set data for labels, systolicData, diastolicData, and pulseData
                    this.labels = data.map((item, index) => `Day ${index + 1}`);
                    this.systolicData = data.map(item => item.systolic);
                    this.diastolicData = data.map(item => item.diastolic);
                    this.pulseData = data.map(item => item.pulse);

                    // Update the chart to display the initial data
                    this.updateChart();
                }
            })
            .catch((error) => {
                console.error('Error fetching tracking data:', error);
            });
            // Fetch data from the server using Axios or load initial data here
            // Set this.labels, this.systolicData, this.diastolicData, this.pulseData
            // Then, call this.updateChart() to display the chart.
        }
      };
    });
  });