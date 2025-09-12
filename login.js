
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // In a real application, you would send the username and password
    // to a server for authentication. For this example, we'll simulate
    // a successful login.

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log("username:", username, "password:", password);

    // Simulate login register
    if (username === "rafly" && password === "rafly") {
        alert("Login success, Happy Adventure!")
        window.location.href = "./index.html"; // Redirect to your main page
    } else {
        alert("Invalid credentials. Please try again.");
    }
});