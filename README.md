# spa-prueba 
# Riwi - Project Management Dashboard (SPA)

A modern, responsive Single Page Application (SPA) designed for internal project management. The application features a dynamic dashboard with a dual-role interface tailored for **Managers** and **Collaborators**. Built with vanilla JavaScript, structured dynamically using **Vite**, and styled with **Tailwind CSS**.

---

## Features

### 👤 Role-Based Access Control & Views
* **Manager**: Full administrative access. Features a real-time CRUD panel to Create, Read, Update, and Delete projects.
* **Collaborator**: Restricted access. View only assigned projects with permissions to dynamically update project execution status (`In Progress` / `Completed`).

### 📊 Dynamic Metrics Dashboard
* Live counters tracking **Total Projects**, **In Progress**, and **Completed** statuses depending on the logged-in user context.

---

## Prerequisites: Installing Node.js

To run this project locally, you must have **Node.js** installed on your system. Follow these steps depending on your operating system:

### 🪟 Windows & 🍏 macOS
1. Go to the official website: [nodejs.org](https://nodejs.org/).
2. Download the **LTS (Long Term Support)** version recommended for most users.
3. Run the downloaded installer and follow the setup wizard (leave default settings checked).
4. **Restart your terminal** or Visual Studio Code to apply changes.

### 🐧 Linux (Ubuntu/Debian)
Run the following commands in your terminal:
```bash
sudo apt update
sudo apt install nodejs npm
