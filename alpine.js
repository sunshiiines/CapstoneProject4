document.addEventListener("alpine:init", () => {

    Alpine.data("predictionApp", () => {
        return {
            readings: [],
            systolicBP: '',
            diastolicBP: '',
            pulse: '',
            chartData: null,
            
            addReading() {
                if (this.systolicBP && this.diastolicBP && this.pulse) {
                    this.readings.push({
                        systolicBP: this.systolicBP,
                        diastolicBP: this.diastolicBP,
                        pulse: this.pulse,
                    });
                    this.updateChart();
                    this.systolicBP = '';
                    this.diastolicBP = '';
                    this.pulse = '';
                }
            },
            updateChart() {
                const systolicData = this.readings.map(reading => reading.systolicBP);
                const diastolicData = this.readings.map(reading => reading.diastolicBP);
                const pulseData = this.readings.map(reading => reading.pulse);

                this.chartData = {
                    labels: [...Array(this.readings.length).keys()].map(String),
                    datasets: [
                        {
                            label: 'Systolic BP',
                            data: systolicData,
                            borderColor: 'rgb(255, 99, 132)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Diastolic BP',
                            data: diastolicData,
                            borderColor: 'rgb(75, 192, 192)',
                            borderWidth: 2,
                            fill: false,
                        },
                        {
                            label: 'Pulse',
                            data: pulseData,
                            borderColor: 'rgb(54, 162, 235)',
                            borderWidth: 2,
                            fill: false,
                        },
                    ],
                };

                // Get the canvas element using x-ref
                const ctx = this.$refs.chartCanvas.getContext('2d');

                if (this.chart) {
                    this.chart.destroy(); // Destroy the existing chart
                }

                this.chart = new Chart(ctx, {
                    type: 'line',
                    data: this.chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                    },
                });
            },
        }
    });
});