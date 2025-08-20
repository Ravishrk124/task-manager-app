# Full-Stack Task Management System

A robust, full-stack **Task Management Application** built with **React, Node.js, Express, and PostgreSQL**.  
The application is fully containerized with Docker for simple setup and deployment.

![App Screenshot](./screenshot.png)  
*(Replace with an actual screenshot of your running app)*

---

## 🚀 Live Demo

- **Frontend (Vercel):** [https://YOUR_FRONTEND_URL.vercel.app](#)
- **Backend API (Render):** [https://YOUR_BACKEND_URL.onrender.com](#)
- **API Docs (Swagger):** [https://YOUR_BACKEND_URL.onrender.com/api-docs](#)

*(Replace the placeholder URLs with your actual deployed links)*

---

## ✨ Features

- 🔐 **Authentication** – Secure registration & login with JWT + bcrypt
- 👥 **Role-Based Access** – `admin` and `user` roles
- 👨‍💼 **User Management** – Admins can create, update, and delete users
- ✅ **Task Management** – Full CRUD for tasks
- 📌 **Task Assignment** – Admins can assign tasks to users
- 📂 **File Uploads** – Attach up to 3 PDFs per task
- 📖 **API Documentation** – Auto-generated Swagger docs
- 🧪 **Testing** – Jest + Supertest integration tests
- 🐳 **Dockerized** – One-command setup with Docker Compose
- 🎨 **Responsive UI** – Clean TailwindCSS frontend

---

## 🛠 Tech Stack

| Layer        | Technology |
|--------------|------------|
| **Frontend** | React (Vite), Redux Toolkit, React Router, TailwindCSS |
| **Backend**  | Node.js, Express.js |
| **Database** | PostgreSQL |
| **ORM**      | Sequelize |
| **DevOps**   | Docker, Docker Compose |
| **Testing**  | Jest, Supertest |
| **Docs**     | Swagger / OpenAPI |

---

## ⚡ Getting Started (Local Setup)

### Prerequisites
- [Node.js](https://nodejs.org/en/) v18+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Git client

### Installation

1. Clone repo:
   ```bash
   git clone https://github.com/Ravishrk124/task-manager-app.git
   cd task-manager-app
