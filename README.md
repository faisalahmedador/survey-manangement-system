# Survey Management System

This project is a Survey Management System built with NestJS (Backend) and Angular (Frontend), using MySQL as the database.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run

### Using Docker (Recommended)

1.  **Clone the repository** (if you haven't already).

2.  **Start the application**:
    Run the following command in the root directory:
    ```bash
    docker-compose up -d --build
    ```

3.  **Access the applications**:
    - **Frontend**: [http://localhost:4200](http://localhost:4200)
    - **Backend API**: [http://localhost:3000](http://localhost:3000)
    - **Database**: `localhost:3307` (via host)

### Running Locally

If you prefer to run the components locally without Docker:

#### 1. Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application in development mode:
   ```bash
   npm run start:dev
   ```
4. (Optional) To add dummy users, run:
   ```bash
   npm run seed
   ```

#### 2. Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm start
   ```
4. Access the frontend at [http://localhost:4200](http://localhost:4200)

## Default Users

The application automatically seeds two dummy users upon startup. Both users share the same password: `password123`.

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@example.com` | `password123` |
| **Officer** | `officer@example.com` | `password123` |

## Features & Roles

### Admin User
- Create new surveys.
- View the list of all created surveys.
- View all survey submissions.

### Officer User
- View available surveys.
- Respond to/submit surveys created by admins.