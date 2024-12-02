const express = require('express');
const { addExpense, getExpenses } = require('../controllers/expenseController');
const { getLeaderboard } = require('../controllers/leaderboardController');  // Import leaderboard controller
const { deleteExpense } = require("../controllers/expenseController");
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', authMiddleware, addExpense);    //APi
router.get('/list', authMiddleware, getExpenses);   //APi
router.get('/leaderboard', authMiddleware, getLeaderboard); // Get leaderboard
router.delete('/delete/:id', authMiddleware, deleteExpense);



module.exports = router;
