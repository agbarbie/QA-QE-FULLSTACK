// Select the form and add an event listener for submission
const registerForm = document.getElementById("register-form") as HTMLFormElement;

registerForm.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload on form submission

    // Get form values
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const confirmPassword = (document.getElementById("confirm-password") as HTMLInputElement).value;

    // Validate password confirmation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // Create user object
    const user = {
        user_id: 1,  // Static ID (for now)
        name: name,
        email: email,
        password: password,  // In a real scenario, hash this before storing
        role_id: 1  // Static Role (Admin/User)
    };

    // Store user in local storage (simulate a database)
    localStorage.setItem("registeredUser", JSON.stringify(user));

    // Show success message and redirect to login page
    alert("Registration successful! You can now log in.");
    window.location.href = "login.html";
});
