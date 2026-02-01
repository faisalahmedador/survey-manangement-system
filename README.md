# Survey Management System

This project is a Survey Management System built with NestJS (Backend) and Angular (Frontend), using MySQL as the database.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## How to Run

1.  **Clone the repository** (if you haven't already).

2.  **Start the application**:
    Run the following command in the root directory:
    ```bash
    docker-compose up -d --build
    ```

3**Access the applications**:
    - **Frontend**: [http://localhost:4200](http://localhost:4200)
    - **Backend API**: [http://localhost:3000](http://localhost:3000)
    - **Database**: `localhost:3307` (via host)

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