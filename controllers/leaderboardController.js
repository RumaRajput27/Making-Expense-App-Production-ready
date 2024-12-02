// leaderboardController.js

const db = require('../config/db');

exports.getLeaderboard = (req, res) => {
    const query = `
        SELECT u.username, SUM(e.amount) AS totalExpenses
        FROM users u
        JOIN expenses e ON u.id = e.user_id
        GROUP BY u.id
        ORDER BY totalExpenses DESC;
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ error: "Error retrieving leaderboard" });
        }
        res.json(results);
    });
};







