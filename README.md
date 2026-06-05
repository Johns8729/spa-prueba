# 🚀 Riwi - Project Management Dashboard (SPA)

A modern and responsive **Single Page Application (SPA)** for internal project management. It features a dynamic dashboard with dual interface depending on the user role: **Manager** and **Collaborator**.

Built with **Vanilla JavaScript**, **Vite**, and **Tailwind CSS**.

---

## ✨ Features

### 👤 Role-Based Access Control

- **Manager**:
  - Full administrative access.
  - Real-time CRUD panel (Create, Read, Update and Delete projects).

- **Collaborator**:
  - Restricted access.
  - Can only view assigned projects.
  - Can update the execution status (`In Progress` / `Completed`).

### 📊 Dynamic Dashboard

- Real-time counters for:
  - Total Projects
  - In Progress
  - Completed

Data is filtered according to the logged-in user.

---

## 🛠 Technologies Used

- **Frontend**: Vanilla JavaScript + Vite
- **Styling**: Tailwind CSS
- **Simulated Backend**: json-server
- **Tools**: PostCSS, Autoprefixer

---
Install dependencies:

Bashnpm install

Start the data server (json-server):

Bashnpm run server
(Run in one terminal)

Start the application (in another terminal):

Bashnpm run dev

Open your browser at: http://localhost:5173


📁 Project Structure
spa-prueba/
├── src/
│   ├── views/          # Role-based views (Manager and Collaborator)
│   ├── main.js         # Entry point
│   └── style.css       # Custom styles
├── db.json             # Simulated database
├── index.html
├── package.json
├── tailwind.config.js
└── README.md

👥 Test Users
The project includes test users in db.json. You can use them to test both roles.

📄 License
This project was created as part of a challenge/academic assignment for Riwi.

Ready to impress! ✨
```bash
sudo apt update
sudo apt install nodejs npm
