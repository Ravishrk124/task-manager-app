### server/config/database.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Create a new Sequelize instance, connecting to our PostgreSQL database
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Set to console.log to see the raw SQL queries
  dialectOptions: {
    // Required for Render deployment, but good practice for development
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

// Function to test the database connection
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully. 🐘');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };