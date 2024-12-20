# Job Board Application

A full-stack job board application built with React, Node.js, Express, and MongoDB.

## Features

- User Authentication (Register/Login)
- Create, Edit, View and Delete Job Listings
- Category-based Job Organization
- Responsive Material-UI Design
- Token-based Authentication
- RESTful API Integration

## Tech Stack

- **Frontend**: React, Material-UI, Vite
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- MongoDB
- Git

## Installation & Setup

### 1. Clone the Repository

git clone <repository-url>
cd job-board-application

Navigate to backend directory
cd backend
Install dependencies
npm install
Create .env file
touch .env
Add the following to `backend/.env`:

env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000

### 3. Frontend Setup

bash
Navigate to frontend directory
cd frontend
Install dependencies
npm install
Create .env file
touch .env

Add the following to `frontend/.env`:
env
VITE_API_URL=http://localhost:5000

## Running the Application

### Start Backend Server

bash
cd backend
npm run start
Server will run on http://localhost:5000

### Start Frontend Development Server

bash
cd frontend
npm run dev

Frontend will run on http://localhost:5173

## Project Structure

├── backend/
│ ├── controllers/ # Route controllers
│ ├── models/ # Database models
│ ├── routes/ # API routes
│ ├── middleware/ # Custom middleware
│ └── server.js # Server entry point
│
└── frontend/
├── src/
│ ├── components/ # Reusable components
│ ├── pages/ # Page components
│ ├── context/ # React context
│ ├── hooks/ # Custom hooks
│ └── App.jsx # Root component
└── index.html

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

### Job Routes

- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create new job
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job
- `GET /api/jobs/categories` - Get job categories

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
