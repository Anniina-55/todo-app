# ToDo-app

A simple Todo app built with Node.js (backend) and vanilla JavaScript (frontend). It allows users to manage tasks by adding, editing, and removing them. This app uses Express for the backend and interacts with a PostgreSQL database for task storage

## Technologies

- Frontend: HTML, CSS, JavaScript, Bootstrap
- Backend: Node.js, Express
- Database: PostgreSQL

## Prerequisites

- Node.js and npm installed.
- PostgreSQL (or any other database you're using) set up and running

## Setup Instructions

### Clone the repository to your local machine
- run command: git clone https://github.com/Anniina-55/todo-app.git

### Frontend

1. Run `npm install` to install frontend dependencies.
2. Run `npm start` to start the frontend development server.

### Backend

1. Navigate to the `server` folder.
2. Run `npm install` to install backend dependencies.
3. Set up environment variables in the .env file (e.g., database connection details).
4. Run `npm run devStart` to start the backend server (this will run your server on http://localhost:).
    
## Usage

- Frontend: Interact with the UI to add and remove tasks.
- Backend: The backend provides endpoints to manage tasks in the database (GET, POST, DELETE). The API is used by the frontend to fetch and manage tasks.

## License

MIT License
