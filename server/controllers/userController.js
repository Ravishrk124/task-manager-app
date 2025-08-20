const User = require('../models/User');

// @desc   Create a user
// @route  POST /api/users
// @access Private/Admin
exports.createUser = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ email, password, role });
    res.status(201).json({ id: user.id, email: user.email, role: user.role });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
};

// @desc   Update a user
// @route  PUT /api/users/:id
// @access Private/Admin
exports.updateUser = async (req, res) => {
    const { email, role } = req.body;
    try {
        const user = await User.findByPk(req.params.id);
        if (user) {
            user.email = email || user.email;
            user.role = role || user.role;
            const updatedUser = await user.save();
            res.json({ id: updatedUser.id, email: updatedUser.email, role: updatedUser.role });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Error updating user', error: error.message });
    }
};

// @desc   Get all users for task assignment dropdown
// @route  GET /api/users/list
// @access Private/Admin
exports.getUsersForAssignment = async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'email'] });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


// Keep existing getUsers and deleteUser functions here...
exports.getUsers = async (req, res) => { /* ... existing code ... */ };
exports.deleteUser = async (req, res) => { /* ... existing code ... */ };