const express = require('express'); //for handling route
const cors = require('cors'); //allow frontend to connected to server (backend)
const dotenv = require('dotenv'); //loads environment from .env file
const { Pool } = require('pg'); //PostgreSQL client for node.js

dotenv.config(); //load env variable for db credentials


const app = express();
app.use(cors()); //enable cors for allow request from frontend (client)
app.use(express.json()); //parse json body 

const port = 3000; 

//connect to PostgreSQL using .env file
const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
}) 

//get static files (html, css, js) from the same folder as server.js
const path = require("path");
app.use(express.static(__dirname));

//test db connection 
pool.connect()
    .then(() => console.log("connected to postgreSQL"))
    .catch((err) => console.error("postgreSQL connection error:", err));

//test server
app.get("/", (req, res) => {
    res.json({ message: "Server is running!"})
})


//register route endpoint
app.post("/register", async (req, res) => {
    const { username, password } = req.body; //get data from request body

   //check if fields missing return error  
    if (!username || !password) {
        return res.status(400).json({ success: false, error: "Fields Empty"});
    }

    try {
        const result = await pool.query(
            //insert new user into db and return new user id
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, password]
        )

        res.json({ success: true, userId: result.rows[0].id });

    } catch (err) {
        //23505 PostgreSQL error code for duplicate
        if (err.code == "23505") {
            //duplicate username
            return res.status(400).json({ success: false, error: "Username is not available"})
        }
        console.error("Error inserting user:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
})

//login route endpoint

app.post("/login", async (req, res) => {
    const { username, password } = req.body; //get data from request body

    try {
        const result = await pool.query(
            //query user by username and password
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        //if found then success
        if (result.rows.length > 0) {
            res.json({ success: true});
        } else {
            //else then throw invalid credentials
            res.status(401).json({ success: false, error: "Invalid credentials "})
        }
    } catch (err) {
        console.error("Error querying users:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
});

//contact-form route endpoint
app.post("/services", async (req, res) => {
    const { nama, email, no_hp } = req.body;  //get data from request body

    try {
        const result = await pool.query(
            //insert new contact into contact_us table
            "INSERT INTO contact_us (nama, email, no_hp) VALUES ($1, $2, $3) returning id",
            [nama, email, no_hp]
        );
        //if success respond with contactId: id
        res.json({ success: true, contactId: result.rows[0].id });

    } catch (err) {
        //column cant be null 
        if (err.code == "23502") {
            //throw error
            return res.status(400).json({ success: false, error: "Column cant be null"})
        }
        console.error("Error inserting contact_us:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
})

//start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});