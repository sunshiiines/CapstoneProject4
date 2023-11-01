 document.addEventListener("alpine:init", () => {
        Alpine.data("loginData", () => {
            return {
                email: '',
                password: '',
                rememberMe: false, // Add a "Remember Me" checkbox
                
                // Initialize the email and password from local storage
                init() {
                    const storedEmail = localStorage.getItem('storedEmail');
                    const storedPassword = localStorage.getItem('storedPassword');
                    if (storedEmail && storedPassword) {
                        this.email = storedEmail;
                        this.password = storedPassword;
                        this.rememberMe = true; 
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
                        // Handle the response
                        console.log('Login successful', response.data);
                    })
                    .catch(error => {
                        
                        console.error('Login failed', error);
                    });
                }
            };
        });
    });

