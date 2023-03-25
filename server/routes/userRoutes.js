const express = require('express');
const {
  register,
  login,
  getMe
} = require('../controllers/User/userController');

const router = express.Router();

router.post('/', register);
router.post('/login', login);
router.get('/me', getMe);

module.exports = router;
