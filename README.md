# Task Management API

A simple Express REST API to manage user-specific tasks secured with JWT.

## Setup Instructions

1. Clone the repository and install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root folder and add your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```
3. Start the server:
   ```bash
   npm start
   ```

## API Endpoints & Examples

### 1. Create a Task
* **URL:** `POST /api/tasks`
* **Headers:** `Authorization: Bearer <your_jwt_token>`
* **Body (JSON):**
  ```json
  {
    "title": "Buy groceries"
  }
  ```
* **Response (201 Created):**
  ```json
  {
    "_id": "650c8f3b...",
    "title": "Buy groceries",
    "completed": false,
    "user": "650c8d1a...",
    "createdAt": "2026-09-08T...",
    "updatedAt": "2026-09-08T..."
  }
  ```

### 2. Get My Tasks
* **URL:** `GET /api/tasks`
* **Headers:** `Authorization: Bearer <your_jwt_token>`
* **Response (200 OK):**
  ```json
  [
    {
      "_id": "650c8f3b...",
      "title": "Buy groceries",
      "completed": false,
      "user": "650c8d1a..."
    }
  ]
  ```
