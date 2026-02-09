User Management Portal – React CRUD Application

A full-stack React + TypeScript CRUD application for managing users with dynamic, schema-driven fields, built with extensibility and clean architecture.

🔗 Live Demo: https://user-management-portal-4up4.onrender.com/


🚀 Tech Stack

Frontend
* React 19 + TypeScript
* Vite
* Material UI (MUI)
* React Hook Form
* React Query (TanStack)
* Axios
* React Router
  
Backend
* Node.js + Express
* TypeScript
* MongoDB + Mongoose
* REST API
* CORS, dotenv


✨ Features

User Management (CRUD)
* Create, Read, Update, Delete users
* Dynamic form rendering based on backend field configuration
* Search across all user fields
* Pagination and validation
* Confirmation dialogs for delete actions

Dynamic Field Configuration (Admin)
* Add / remove user fields dynamically
* Supported field types: text, number, email, date
* Required / optional fields
* Changes immediately reflect in User forms and tables

Validation
* Required field enforcement
* Email format validation
* Type-specific input handling

🧩 Extensibility – How to Add New Fields
This application is schema-driven.

Step 1: Add a Field (UI)
* Go to Admin → Configure Fields
* Add a new field:
    * Display Name (e.g., Date of Birth)
    * Database Key (e.g., dob)
    * Type (text, number, email, date)
    * Required (optional)
    
Step 2: Done 
* The field automatically:
    * Appears in the User Create/Edit form
    * Appears in the User table
    * Supports validation and search
* No frontend or backend code changes required

This is achieved through:
* Backend-stored field schema
* Dynamic form generation using React Hook Form
* Generic user data storage (data: Record<string, any>)

🛠️ Setup Instructions
Prerequisites
* Node.js ≥ 18
* MongoDB (local or Atlas)

Backend Setup
cd backend
npm install
npm run dev
Create a .env file:

PORT=3000
MONGO_URI=mongodb+srv://user_management_portal:Dha%40231001@cluster0.esn4chq.mongodb.net/user_management_portal?retryWrites=true&w=majority

Frontend Setup
cd client/user_management_portal
npm install
npm run dev

For production build:
npm run build

📦 API Endpoints
Users
* GET /api/users
* POST /api/users
* PUT /api/users/:id
* DELETE /api/users/:id
  
Fields
* GET /api/fields
* POST /api/fields
* DELETE /api/fields/:id

📌 Design Decisions & Assumptions
* User data is stored as a flexible object (data) to support dynamic fields
* Field definitions are managed server-side for consistency
* React Query handles caching, loading, and error states
* UI prioritizes clarity, responsiveness, and maintainability
* TypeScript used throughout for safety and scalability

🧪 Mock API
Not required — a real Express + MongoDB backend is used.

📬 Submission
* GitHub Repo: https://github.com/Dharshini231001/User-Management-Portal/
* Live URL: https://user-management-portal-4up4.onrender.com/
