
require('dotenv').config();
const { sequelize } = require('../config/database');

// Connect to the DB before all tests
beforeAll(async () => {
  await sequelize.sync({ force: true }); // force: true will drop tables if they exist
});

// Close the DB connection after all tests
afterAll(async () => {
  await sequelize.close();
});