const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, createUser, updateUser, getUsersForAssignment } = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, admin, getUsers)
    .post(protect, admin, createUser);

// Add this new route for the assignment list
router.get('/list', protect, admin, getUsersForAssignment);

router.route('/:id')
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser);

module.exports = router;