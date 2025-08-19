

const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// This route is protected and can only be accessed by admins
router.route('/')
  .get(protect, admin, getUsers);

// This route is also protected and admin-only
router.route('/:id')
  .delete(protect, admin, deleteUser);

module.exports = router;