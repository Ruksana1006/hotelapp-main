const express = require('express');
const router = express.Router();
const {loginUser,registerUser, getAllUsers} = require("../Controller/authcontroller");
// Register a new user
router.post('/register', registerUser);

// Login an existing user
router.post('/login',loginUser);

router.get('/getusers',getAllUsers)

module.exports = router;
