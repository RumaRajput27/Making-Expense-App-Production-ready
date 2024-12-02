const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);  //http://localhost:3000/auth/register-auth is endpoint and register is api.
router.post('/login', login);      //http://localhost:3000/expenses/login
 
module.exports = router;
