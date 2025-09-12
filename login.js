
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // In a real application, you would send the username and password
    // to a server for authentication. For this example, we'll simulate
    // a successful login.

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    console.log("username:", username, "password:", password);

    try {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password})
        });

        const data = await response.json();

        if (data.success) {
            alert("login success!");
            window.location.href = "./index.html";
        } else {
        alert("login failed! " + data.error);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("server error")
    }
 });