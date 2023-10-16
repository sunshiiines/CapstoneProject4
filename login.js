 document.addEventListener("alpine:init", () => {
        Alpine.data("loginData", () => {
            return {
                email: '',
                password: '',
                rememberMe: false, // Add a checkbox for "Remember Me"
                
                // Initialize the email and password from local storage
                init() {
                    const storedEmail = localStorage.getItem('storedEmail');
                    const storedPassword = localStorage.getItem('storedPassword');
                    if (storedEmail && storedPassword) {
                        this.email = storedEmail;
                        this.password = storedPassword;
                        this.rememberMe = true; // Check the "Remember Me" checkbox
                    }
                },

                login() {
                    // Check if "Remember Me" is selected and store email and password
                    if (this.rememberMe) {
                        localStorage.setItem('storedEmail', this.email);
                        localStorage.setItem('storedPassword', this.password);
                    } else {
                        // Clear stored email and password
                        localStorage.removeItem('storedEmail');
                        localStorage.removeItem('storedPassword');
                    }

                    axios.post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .then(response => {
                        // Handle the response, e.g., redirect to a new page
                        console.log('Login successful', response.data);
                    })
                    .catch(error => {
                        // Handle login errors, e.g., display an error message
                        console.error('Login failed', error);
                    });
                }
            };
        });
    });

