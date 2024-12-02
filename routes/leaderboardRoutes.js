// leaderboardRoutes.js

const express = require('express');
const { getLeaderboard } = require('../controllers/leaderboardController');
const authMiddleware = require('../middleware/authMiddleware');  // <-- Import the authMiddleware
const router = express.Router();

router.get('/', authMiddleware, getLeaderboard);  // Protecting the leaderboard route with authMiddleware

module.exports = router;

