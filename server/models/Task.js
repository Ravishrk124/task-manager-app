

const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./User');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
    defaultValue: 'To Do',
  },
  priority: {
    type: DataTypes.ENUM('Low', 'Medium', 'High'),
    defaultValue: 'Medium',
  },
  dueDate: {
    type: DataTypes.DATE,
  },
  // This will store an array of file paths as a JSON string
  documents: {
    type: DataTypes.JSON, 
    defaultValue: [],
  },
});

// Define the relationship: A User can have many Tasks.
User.hasMany(Task, { foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assignedTo' });

module.exports = Task;