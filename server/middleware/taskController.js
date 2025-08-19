### server/controllers/taskController.js

const { Op } = require('sequelize');
const Task = require('../models/Task');
const User = require('../models/User');
const path = require('path');

exports.createTask = async (req, res) => {
  const { title, description, status, priority, dueDate, assignedTo } = req.body;
  try {
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      documents: req.files ? req.files.map(file => file.filename) : [],
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, priority, dueDate, sortBy = 'createdAt', order = 'DESC', page = 1, limit = 10 } = req.query;

    let where = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (dueDate) where.dueDate = { [Op.gte]: new Date(dueDate) };

    // **Authorization Logic**: Admins see all tasks, users only see tasks assigned to them.
    if (req.user.role !== 'admin') {
      where.assignedTo = req.user.id;
    }

    const tasks = await Task.findAndCountAll({
      where,
      include: [{ model: User, as: 'assignee', attributes: ['id', 'email'] }],
      order: [[sortBy, order.toUpperCase()]],
      limit: parseInt(limit),
      offset: (parseInt(page) - 1) * parseInt(limit),
    });

    res.json({
      totalItems: tasks.count,
      totalPages: Math.ceil(tasks.count / limit),
      currentPage: parseInt(page),
      tasks: tasks.rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id, {
            include: [{ model: User, as: 'assignee', attributes: ['id', 'email'] }]
        });
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Authorization check
        if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        res.json(task);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Authorization check
        if (req.user.role !== 'admin' && task.assignedTo !== req.user.id) {
            return res.status(403).json({ message: 'User not authorized' });
        }
        const updatedTask = await task.update(req.body);
        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: 'Error updating task', error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Authorization check (Only admin can delete)
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'User not authorized' });
        }
        await task.destroy();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.downloadDocument = (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../uploads', filename);

    res.download(filePath, (err) => {
        if (err) {
            if (err.code === "ENOENT") {
                res.status(404).send({ message: "File not found." });
            } else {
                res.status(500).send({ message: "Could not download the file." });
            }
        }
    });
};