# ResolveDesk – Complaint Management System

A full-stack web application that allows users to submit, track, and manage complaints, with an admin-facing view to monitor and update complaint status. Built as an academic project to practice full-stack development and database-driven CRUD operations.

## Features
- Submit new complaints with relevant details
- Track complaint status (e.g., pending, in progress, resolved)
- View and manage a list of all submitted complaints
- User-based data handling via a relational database
- React frontend communicates with the PHP backend via JSON-based API responses

## Tech Stack
- **Frontend:** React, JavaScript, CSS
- **Backend:** PHP
- **Data Exchange:** JSON (used for communication between the React frontend and PHP backend)
- **Database:** MySQL

## Database
The `complaint_system` database includes two main tables:
- `users` – stores user information
- `complaints` – stores complaint records, linked to users

A database export (`complaint_system.sql`) is included in this repository.

## Getting Started

### Prerequisites
- XAMPP (or any Apache + MySQL + PHP environment)
- Node.js (for running the React frontend)

### Setup
1. Clone this repository
2. Import `complaint_system.sql` into phpMyAdmin to set up the database
3. Update database credentials in the PHP config file if needed (default XAMPP: `root` with no password)
4. Start Apache and MySQL via XAMPP
5. Navigate to the frontend folder and run:
   ```
   npm install
   npm start
   ```
6. Ensure the backend PHP files are placed in your `htdocs` folder (or equivalent) so the frontend can communicate with them

## Author
Arisha Azhar
