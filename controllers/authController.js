// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');  // Assuming you're using MySQL

exports.register = (req, res) => {
    const { username, email, password } = req.body;
    console.log({ username, email, password });  // Log the received data

    // Validate inputs
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    // Hash the password before saving it in the database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: "Error hashing password" });
        }

        // Insert user into the database
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Error saving user to database" });
            }

            // Optionally, generate JWT token
            const token = jwt.sign({ userId: result.insertId, username }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.status(201).json({
                message: "User registered successfully",
                token: token
            });
        });
    });
};


exports.login = (req, res) => {
    const { email, password } = req.body;
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err || results.length === 0) return res.status(400).json({ error: "User not found" });
        bcrypt.compare(password, results[0].password, (err, isMatch) => {
            if (!isMatch) return res.status(400).json({ error: "Incorrect password" });
            const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ message: "Logged in successfully", token });
        });
    });
};
