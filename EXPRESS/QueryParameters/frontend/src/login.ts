document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form") as HTMLFormElement;
    
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Prevent page refresh
        
      // Get user input values
      const email = (document.getElementById("email") as HTMLInputElement).value;
      const password = (document.getElementById("password") as HTMLInputElement).value;
        
      // Simple validation
      if (email && password) {
        // Redirect to Book List page
        window.location.href = "index.html";
      } else {
        alert("Please enter both email and password!");
      }
    });
  }
});