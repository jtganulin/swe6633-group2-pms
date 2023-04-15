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

router.post('/', protect, admin, setProject);
router.get('/getProjects', protect, getProjects);
router.delete('/project/:id', protect, admin, deleteProjects);
router.put('/update-project/:id', protect, admin, updateProjects);

module.exports = router;
