const express = require('express');
const router = express.Router();
const {
  setProject,
  getProjects
} = require('../controllers/Project/projectController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, setProject);
router.get('/getProjects', protect, getProjects);

module.exports = router;
