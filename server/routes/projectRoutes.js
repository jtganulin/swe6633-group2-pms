const express = require('express');
const router = express.Router();
const {
  getProject,
  setProject,
  getProjects,
  deleteProject,
  updateProject,
  updateProjectEffort
} = require('../controllers/Project/projectController');
const {
  protect,
  admin
} = require('../middleware/authMiddleware');

router.get('/projects', protect, getProjects);
router.post('/project', protect, setProject);
router.get('/project/:id', protect, getProject);
router.delete('/project/:id', protect, deleteProject);
router.put('/project/:id', protect, updateProject);
router.put('/project/:id/effort', protect, updateProjectEffort)

module.exports = router;
