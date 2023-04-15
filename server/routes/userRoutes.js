const express = require('express');
const {
  register,
  login,
  logout,
  getMe
} = require('../controllers/User/userController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', getMe);
router.post('/logout', logout);

module.exports = router;
