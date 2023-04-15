const express = require('express');
const router = express.Router();
const {
  setProject,
  getProjects,
  deleteProjects,
  updateProjects
} = require('../controllers/Project/projectController');
const {
  protect,
  admin
} = require('../middleware/authMiddleware');

router.get('/projects', protect, getProjects);
router.post('/project', protect, setProject);
// router.get('/project/:id', protect, getProject);
router.delete('/project/:id', protect, deleteProjects);
router.put('/project/:id', protect, updateProjects);

module.exports = router;
