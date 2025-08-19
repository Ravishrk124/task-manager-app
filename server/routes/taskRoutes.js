### server/routes/taskRoutes.js

const express = require('express');
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  downloadDocument,
} = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const uploadMiddleware = require('../middleware/uploadMiddleware');

// Protect all task routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(uploadMiddleware, createTask);

router.route('/:id')
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

router.get('/document/:filename', downloadDocument);

module.exports = router;