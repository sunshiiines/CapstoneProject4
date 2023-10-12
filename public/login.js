import axios from 'axios';

// Create an Alpine data object.
const user = Alpine.data('user', () => ({
  username: '',
  password: '',
  isLoggedIn: false,

  // Login function.
  login() {
    // Get the username and password from the form.
    const username = this.username;
    const password = this.password;

    // Check if the username and password are too short.
    if (username.length < 3 || password.length < 6) {
      alert('Username and password must be at least 3 characters long.');
      return;
    }

    // Send a request to the server to log in.
    axios.post('/login', { username, password })
      .then(response => {
        // If the login is successful, set the isLoggedIn property to true.
        this.isLoggedIn = true;
      })
      .catch(error => {
        // Handle the error.
        alert('Login failed.');
      });
  },

  // Logout function.
  logout() {
    // Confirm with the user before logging out.
    if (confirm('Do you want to logout?')) {
      // Send a request to the server to log out.
      axios.post('/logout')
        .then(response => {
          // If the logout is successful, set the isLoggedIn property to false.
          this.isLoggedIn = false;
        })
        .catch(error => {
          // Handle the error.
          alert('Logout failed.');
        });
    }
  }
}));
document.addEventListener("alpine:init", () => {
  Alpine.data("loginDetails", () => {
    return {
      username: "",
      failureMessage: "",

      login() {
        if (this.username.length > 2) {
          localStorage.setItem("username", this.username);
          // Call the 'createlogin' function to handle the login session if needed
        } else {
          alert("Username is too short");
        }
      },

      logout() {
        if (confirm("Do you want to logout")) {
          this.username = "";
          localStorage.removeItem("username");
          localStorage.removeItem("password");
          // Handle the logout process as needed
        }
      },
    };
  });
});
