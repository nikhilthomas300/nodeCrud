# Backend API using Node, Express, and MongoDB  

A RESTful API built with Node.js, Express.js, and MongoDB for managing items. This project implements key backend concepts such as Authentication, Authorization, CRUD Operations, and MVC Architecture.  

---

## Table of Contents  
1. [Features](#features)  
2. [Technologies Used](#technologies-used)  
3. [Installation](#installation)  
4. [Folder Structure](#folder-structure)  
5. [API Endpoints](#api-endpoints)  
6. [Contributing](#contributing)  


---

## Features  
- **CRUD Operations**: Create, Read, Update, Delete items in the database.  
- **Authentication**: User registration and login with hashed passwords.  
- **Authorization**: Role-based access control for different endpoints.  
- **MVC Architecture**: Clean separation of concerns for scalability.  
- **Local MongoDB Database**: Data stored locally using MongoDB.  

---

## Technologies Used  
- **Node.js**: JavaScript runtime environment.  
- **Express.js**: Web framework for building APIs.  
- **MongoDB**: NoSQL database for data storage.  
- **Mongoose**: ODM for MongoDB.  
- **Dotenv**: Manage environment variables.  
- **Axios**: For frontend HTTP requests.  

---

## Installation  

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/Qoslaye/Node-Express-MongoDB-API.git
   cd Node-Express-MongoDB-API



  ## Folder Structure  
  
├── models/
│   ├── user.js
│   ├── item.js
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   ├── itemRoutes.js
├── utils/
│   ├── db.js
│   ├── authMiddleware.js
├── public/
│   ├── index.html
│   ├── view.html
│   ├── script.js
├── server.js
├── .env
├── package.json
├── README.md

## API Endpoints

### Authentication
POST /api/auth/register – Register a new user.
POST /api/auth/login – Authenticate a user and return a token.

### User Management
GET /api/users – Get all users (Admin only).
GET /api/users/:id – Get a single user.
PUT /api/users/:id – Update a user.
DELETE /api/users/:id – Delete a user.

### Item Management
GET /api/items – Get all items.
GET /api/items/:id – Get a single item.
POST /api/items – Create a new item.
PUT /api/items/:id – Update an item.
DELETE /api/items/:id – Delete an item.
