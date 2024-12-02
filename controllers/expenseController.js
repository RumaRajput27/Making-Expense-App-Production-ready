const db = require('../config/db');

exports.addExpense = (req, res) => {
    const { description, amount, date } = req.body;
    const user_id = req.user.id;
    db.query(
        "INSERT INTO expenses (user_id, description, amount, date) VALUES (?, ?, ?, ?)",
        [user_id, description, amount, date],
        (err) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ message: "Expense added successfully" });
        }
    );
};

exports.getExpenses = (req, res) => {
    const user_id = req.user.id;
    db.query("SELECT * FROM expenses WHERE user_id = ?", [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
};



exports.deleteExpense = (req, res) => {
    const expenseId = req.params.id;
    const userId = req.user.id; // Assuming `authMiddleware` attaches `user` to the request

    const query = "DELETE FROM expenses WHERE id = ? AND user_id = ?";
    db.query(query, [expenseId, userId], (err, results) => {
        if (err) {
            console.error("Error deleting expense:", err);
            return res.status(500).json({ error: "Error deleting expense" });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ error: "Expense not found or unauthorized" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    });
};