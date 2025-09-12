const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

const pool = new Pool({
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE
})

//
const path = require("path");
app.use(express.static(__dirname));

//test db connection
pool.connect()
    .then(() => console.log("connected to postgreSQL"))
    .catch((err) => console.error("postgreSQL connection error:", err));

//check server
app.get("/", (req, res) => {
    res.json({ message: "Server is running!"})
})

//register route
app.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ success: false, error: "Fields Empty"});
    }

    try {
        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
            [username, password]
        )

        res.json({ success: true, userId: result.rows[0].id });

    } catch (err) {
        if (err.code == "23505") {
            //duplicate username
            return res.status(400).json({ success: false, error: "Username is not available"})
        }
        console.error("Error inserting user:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
})

//login route

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const result = await pool.query(
            "SELECT * FROM users WHERE username = $1 AND password = $2",
            [username, password]
        );

        if (result.rows.length > 0) {
            res.json({ success: true});
        } else {
            res.status(401).json({ success: false, error: "Invalid credentials "})
        }
    } catch (err) {
        console.error("Error querying users:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
});

//contact-form route

app.post("/services", async (req, res) => {
    const { nama, email, no_hp } = req.body;

    try {
        const result = await pool.query(
            "INSERT INTO contact_us (nama, email, no_hp) VALUES ($1, $2, $3) returning id",
            [nama, email, no_hp]
        );

        res.json({ success: true, contactId: result.rows[0].id });

    } catch (err) {
        //column cant be null
        if (err.code == "23502") {
            return res.status(400).json({ success: false, error: "Column cant be null"})
        }
        console.error("Error inserting contact_us:", err);
        res.status(500).json({ success: false, error: "Server error"})
    }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`)
});