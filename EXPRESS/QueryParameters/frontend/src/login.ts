document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form") as HTMLFormElement;
  
    if (loginForm) {
      loginForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent page refresh
  
        // Get user input values
        const username = (document.getElementById("username") as HTMLInputElement).value;
        const password = (document.getElementById("password") as HTMLInputElement).value;
  
        // Simple validation
        if (username && password) {
          // Redirect to Book List page
          window.location.href = "booklist.html";
        } else {
          alert("Please enter both username and password!");
        }
      });
    }
  });
  