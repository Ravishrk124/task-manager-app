const request = require('supertest');
const express = require('express');
const { sequelize } = require('../config/database');

// Setup a mock Express app
const app = express();
app.use(express.json());

// Mock auth middleware to simulate a logged-in user
const mockAuth = (req, res, next) => {
    req.user = { id: 1, email: 'test@example.com', role: 'user' };
    next();
};

// Since our routes are modular, we can import and use them
const taskRoutes = require('../routes/taskRoutes');
app.use('/api/tasks', mockAuth, taskRoutes); // Apply mock auth to task routes

describe('Task Endpoints', () => {
    let testUser;
    let authToken;

    // You would typically have a more robust user setup
    beforeAll(async () => {
        // We know from auth.test.js that a user can be created.
        // For a real test suite, you'd create a user and log in here to get a token.
        // For simplicity here, we are using a mock user.
    });

    it('should create a task for the authenticated user', async () => {
        const res = await request(app)
            .post('/api/tasks')
            .send({
                title: 'Test Task',
                description: 'This is a test description.',
                assignedTo: 1
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.title).toBe('Test Task');
    });

    it('should fetch tasks for the authenticated user', async () => {
        const res = await request(app).get('/api/tasks');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body.tasks)).toBe(true);
        expect(res.body.tasks.length).toBeGreaterThan(0);
    });
});