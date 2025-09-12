document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    console.log("username:", username, "password:", password);

    try {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password}),
        });

        const data = await response.json();

        if (data.success) {
            alert("Registration success!");
            window.location.href = "./login.html";
        } else {
            alert("Registration failed!" + data.error);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Server error!");
    }
});

