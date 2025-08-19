const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const { connectDB, sequelize } = require('./config/database');
const app = express();
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes'); 
const taskRoutes = require('./routes/taskRoutes');
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB(); // Connect to the database
sequelize.sync().then(() => { // Sync all defined models to the DB
  console.log('Database synced');
});
// ADD THIS LINE TO SERVE THE SWAGGER DOCS
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Serve uploaded files statically from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple health check route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Server is healthy' });
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes); 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});