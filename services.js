document.getElementById("services-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = document.getElementById("services-form")[0]
    const nama = document.getElementById("nama").value.trim();
    const email = document.getElementById("email").value.trim();
    const no_hp = document.getElementById("no-hp").value.trim();

    console.log("nama:", nama, "email:", email, "no_hp:", no_hp);

    //validation before sending 
    if (!nama || !email || !no_hp) {
    alert("Please fill out all fields!");
    return;
    }

    try {
        const response = await fetch("http://localhost:3000/services", {
            method: "POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify({ nama, email, no_hp})
        });

        const data = await response.json();

        if(data.success) {
            alert("Success, wait for our response!");
            //reset the form after success sending it
            window.location.href = "./services.html";
        } else {
            alert("Please fill the form!" + data.error);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Server error!")
    }
})