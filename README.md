# Simplified - Task Management Application
## Coding Factory 7 - Final Project

A full-stack task management application built with React and Node.js, featuring user authentication, task organization, and a clean, intuitive interface.

## 📋 Project Overview

This project fulfills all requirements for the Coding Factory 7 final assignment:
- **Domain Model**: Task management system (Users, Lists, Tasks)
- **Technology Stack**: Node.js + MongoDB backend, React frontend
- **Architecture**: Complete implementation of DAO/Repository/DTO/Service/Controller layers
- **Authentication**: JWT-based authentication and authorization system
- **REST API**: Full CRUD operations with proper HTTP methods
- **Testing**: Unit tests and integration tests
- **Documentation**: Swagger API documentation

## 🏗️ Architecture

### Backend Architecture (Node.js + Express + MongoDB)
```
backend/
├── controllers/     # HTTP request handlers (REST API endpoints)
├── services/        # Business logic layer
├── repositories/    # Data access abstraction layer
├── dao/            # Data Access Objects (database operations)
├── dto/            # Data Transfer Objects (validation schemas)
├── models/         # MongoDB schemas and data models
├── middleware/     # Authentication and validation middleware
├── routes/         # API route definitions
├── tests/          # Unit and integration tests
├── docs/           # API documentation (Postman collection)
└── utils/          # Utility functions (logger, etc.)
```

### Frontend Architecture (React)
```
frontend/
├── src/
│   ├── components/ # Reusable UI components (FontSelector)
│   ├── pages/      # Main application views (Login, Register, Dashboard)
│   └── styles/     # CSS files for component styling
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: Joi schemas for request validation
- **Testing**: Jest + Supertest
- **Documentation**: Swagger/OpenAPI 3.0

### Frontend
- **Framework**: React 18
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **Styling**: CSS3 with responsive design

## 📦 Installation & Setup

### Prerequisites
- Node.js 18 or higher
- MongoDB (local installation or MongoDB Atlas)
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd simplified-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Create a `.env` file in the backend root directory:
   ```env
   # Database Configuration
   MONGO_URI=mongodb://localhost:27017/simplified
   MONGO_TEST_URI=mongodb://localhost:27017/simplified_test
   
   # JWT Secret - Change this to a secure random string in production
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # CORS Configuration
   FRONTEND_URL=http://localhost:3000
   API_URL=http://localhost:5000
   ```

4. **Start MongoDB**
   
   Ensure MongoDB is running on your system:
   ```bash
   # For local MongoDB installation
   mongod
   
   # Or use MongoDB Atlas connection string in MONGO_URI
   ```

5. **Start the backend server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd simplified-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

   The frontend will start on `http://localhost:3000`

## 🧪 Testing

### Backend Tests

Run unit and integration tests:
```bash
cd simplified-backend

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

### API Testing with Postman

1. Import the API collection from `docs/postman_collection.json`
2. Set up environment variables:
   - `base_url`: `http://localhost:5000`
   - `auth_token`: (obtained from login endpoint)

## 🚀 Build and Deploy

### Local Development

1. **Start Backend**:
   ```bash
   cd simplified-backend
   npm run dev
   ```

2. **Start Frontend** (in separate terminal):
   ```bash
   cd simplified-frontend
   npm start
   ```

### Production Build

**Backend Deployment:**
```bash
cd simplified-backend

# Install production dependencies
npm ci --only=production

# Set production environment variables
export NODE_ENV=production
export MONGO_URI=your-production-mongodb-uri
export JWT_SECRET=your-production-jwt-secret

# Start the application
npm start
```

**Frontend Deployment:**
```bash
cd simplified-frontend

# Build for production
npm run build

# The build folder contains production-ready static files
# Deploy the build folder to any static hosting service
```

### Environment-Specific Configuration

**Production Environment Variables (Backend):**
```env
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
PORT=5000
FRONTEND_URL=your-frontend-domain
```

**Frontend Environment Variables:**
```env
REACT_APP_API_URL=your-production-api-url
```

## 📚 API Documentation

### Swagger Documentation
Once the backend is running, visit: `http://localhost:5000/api-docs`

### Main API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

#### Lists Management
- `GET /api/lists` - Get user's to-do lists
- `POST /api/lists` - Create new to-do list
- `GET /api/lists/:id` - Get specific list
- `PUT /api/lists/:id` - Update list title/category
- `DELETE /api/lists/:id` - Delete list

#### Task Management (To-Do Items)
- `POST /api/lists/:id/tasks` - Add new task to list
- `PUT /api/lists/:id/tasks/:index/toggle` - Check/uncheck task completion
- `PUT /api/lists/:id/tasks/:index` - Edit task text
- `DELETE /api/lists/:id/tasks/:index` - Delete task
- `PUT /api/lists/:id/tasks/reorder` - Reorder tasks within list

## 🎯 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Task Management**: Create, edit, delete, and organize tasks in lists
- **List Organization**: Categorize tasks into custom lists with categories
- **Real-time Updates**: Instant UI updates when tasks are modified
- **Responsive Design**: Works on desktop and mobile devices
- **Font Customization**: Choose different fonts and sizes
- **Data Persistence**: All data stored securely in MongoDB

## 🏃‍♂️ Usage

1. **Register an Account**
   - Visit the application
   - Click "Sign up here" on the login page
   - Fill in username, email, and password

2. **Create Lists**
   - After logging in, use the "Create List" form
   - Enter a title and optional category

3. **Manage Tasks**
   - Add tasks using the "Add a new task" input in each list
   - Click checkboxes to mark tasks as complete
   - Double-click or use Edit button to modify tasks
   - Use Delete button to remove tasks

4. **Customize Experience**
   - Use the font selector to change typography
   - Lists are automatically saved and synchronized

## 📝 Project Requirements Compliance

This project meets all Coding Factory 7 final project requirements:

- ✅ **Domain Model**: Task management system with Users, Lists, and Tasks
- ✅ **Database**: MongoDB with proper schemas and relationships
- ✅ **DAO Layer**: Data Access Objects for database operations
- ✅ **Repository Layer**: Abstraction over DAOs
- ✅ **DTO Layer**: Data validation with Joi schemas
- ✅ **Service Layer**: Business logic implementation
- ✅ **Controllers**: REST API endpoints with proper HTTP methods
- ✅ **Authentication/Authorization**: JWT-based auth system for backend and frontend
- ✅ **Frontend**: React SPA with proper routing
- ✅ **REST API**: RESTful endpoints with full CRUD operations
- ✅ **Testing**: Unit tests for services and integration tests for API
- ✅ **Documentation**: Swagger API documentation and comprehensive README

## 🔧 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`
   - Verify network connectivity

2. **Port Conflicts**
   - Change PORT in `.env` file
   - Kill existing processes: `lsof -ti:5000 | xargs kill -9`

3. **CORS Errors**
   - Verify `FRONTEND_URL` in backend `.env`
   - Check if both servers are running

4. **Authentication Issues**
   - Clear browser local storage
   - Check JWT_SECRET consistency
   - Verify token expiration

## 👨‍💻 Development

This application demonstrates the use of modern web development practices:
- Clean architecture with separation of concerns
- RESTful API design
- Component-based frontend architecture
- Comprehensive testing strategy
- Proper error handling and validation
- Security best practices with JWT authentication

## 📄 License

This project is developed as part of the Coding Factory 7 curriculum and is intended for educational purposes.