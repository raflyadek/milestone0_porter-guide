// register.js

console.log("✅ register.js loaded!");

const registerForm = document.getElementById("register-form");

if (registerForm) {
    console.log("✅ Found #register-form");

    registerForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Stop refresh

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        console.log("username:", username, "password:", password);

        // Simple validation
        if (username.length === 0 || password.length === 0) {
            alert("Invalid input. Please fill the form.");
            return;
        }

        // ✅ Simulate saving to DB here
        // In real app: send fetch/axios POST request to backend to save user

        console.log("✅ Registration successful!");
        window.location.href = "./login.html"; // Redirect to login page
    });

} else {
    console.warn("⚠️ #register-form not found, skipping register logic.");
}