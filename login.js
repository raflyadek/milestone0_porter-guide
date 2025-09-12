
//submit event listener with id login-form
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault(); // prevent page refresh

    // get username and password value from input
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    // check
    console.log("username:", username, "password:", password);

    try {
        // send data to backend (server) via POST request
        //because POST sends data in the body of the HTTP request not in the url like GET
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ username, password}) // convert to json
        });

        // parse server response
        const data = await response.json();

        //if server response success then show alert and redirect to index.html/main page
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