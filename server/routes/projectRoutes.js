const express = require('express');
const router = express.Router();
const {
  setProject,
  getProjects,
  deleteProjects,
  updateProjects
} = require('../controllers/Project/projectController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, setProject);
router.get('/getProjects', protect, getProjects);
router.delete('/project/:id', protect, deleteProjects);
router.put('/update-project/:id', protect, updateProjects);

module.exports = router;
