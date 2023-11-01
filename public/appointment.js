function profileData() {
        return {
            user: null, // Initialize user data as null

            // Function to fetch user data
            fetchUserData() {
                axios.get('/api/user-data') // Replace with your actual API endpoint
                    .then(response => {
                        this.user = response.data; // Set the user data from the response
                    })
                    .catch(error => {
                        console.error('Failed to fetch user data:', error);
                    });
            },

            // Call the fetchUserData function when the component is initialized
            init() {
                this.fetchUserData();
            },
        };
    }
