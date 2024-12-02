const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes'); // Import leaderboard routes
require('dotenv').config();
 
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/auth', authRoutes);           //EndPoint     //http://localhost:3000/auth/register
app.use('/expenses', expenseRoutes);     //EndPoint     //http://localhost:3000/expenses/login
app.use('/leaderboard', leaderboardRoutes); // Add leaderboard route

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


//http://localhost:3000/auth/register    Post Register
//http://localhost:3000/auth/login       PostLogin
//http://localhost:3000/expenses/add?    Post AddExpense
//http://localhost:3000/expenses/list    GetExpenseLiist
//http://localhost:3000/leaderboard      GetLeaderboardList
//http://localhost:3000/expenses/delete/1   