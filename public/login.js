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
