//submit event listener to register form
document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault(); //prevent page refresh
    
    //get username and password value from input form
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    
    //check if we get the value
    console.log("username:", username, "password:", password);

    try {
        //send data to backend (server) via POST request
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password}), //convert to JSON
        });

        const data = await response.json(); //parse server response

        //if data response success show allert and redirect to login page
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

