# 🚀 Riwi - Project Management Dashboard (SPA)

Una **Single Page Application (SPA)** moderna y responsive para la gestión interna de proyectos. Cuenta con un dashboard dinámico con interfaz dual según el rol: **Manager** y **Collaborator**.

Desarrollada con **Vanilla JavaScript**, **Vite** y **Tailwind CSS**.

---

## ✨ Características

### 👤 Control de Acceso por Roles

- **Manager**:
  - Acceso administrativo completo.
  - Panel CRUD en tiempo real (Crear, Leer, Actualizar y Eliminar proyectos).

- **Collaborator**:
  - Acceso restringido.
  - Solo puede ver los proyectos asignados.
  - Puede actualizar el estado de ejecución (`In Progress` / `Completed`).

### 📊 Dashboard Dinámico

- Contadores en tiempo real de:
  - Total de Proyectos
  - En Progreso
  - Completados

Los datos se filtran según el usuario logueado.

---

## 🛠 Tecnologías Utilizadas

- **Frontend**: Vanilla JavaScript + Vite
- **Estilos**: Tailwind CSS
- **Backend Simulado**: json-server
- **Herramientas**: PostCSS, Autoprefixer

---

## 📋 Requisitos Previos

Tener **Node.js** instalado (versión LTS recomendada).

### Instalación de Node.js

#### Windows / macOS
1. Ve a [nodejs.org](https://nodejs.org/)
2. Descarga la versión **LTS**
3. Instala y reinicia tu terminal / VS Code

#### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install nodejs npm
