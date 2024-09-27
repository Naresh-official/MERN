# Hotels.com Backend API

This is a backend api for hotels.com project.

## Table of Contents

-   [Technologies Used](#technologies-used)
-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Environment Variables](#environment-variables)
-   [Running the Project](#running-the-project)
-   [API Documentation](#api-documentation)
-   [Contributing](#contributing)
-   [License](#license)

## Technologies Used

List the technologies and frameworks you're using in the project:

-   **Node.js**: JavaScript runtime
-   **Express**: Web framework for Node.js
-   **MongoDB**: NoSQL database (or SQL database if relevant)
-   **Mongoose**: MongoDB ODM
-   **JWT**: JSON Web Token for authentication
-   **dotenv**: Environment variables
-   **bcrypt**: Password hashing
-   **Multer**: File upload
-   **Cloudinary**: For media file storage

## Features

Briefly list the core features of the project, for example:

-   User authentication (login, signup, JWT)
-   File upload for images (e.g. hotel photos, using Cloudinary)
-   RESTful API
-   CRUD operations for [entities like bookings, users, hotels etc.]

## Project Structure


```plaintext
/backend
├── package.json   # Project metadata
├── README.md      # Project documentation
├── src            # Source codedatabase connection)
|    ├── /controllers   # Logic for handling API requests
|    ├── /models        # Mongoose models (or SQL models)
|    ├── /routes        # API route definitions
|    ├── /middlewares   # Middleware functions (e.g., authentication)
|    ├── /utils         # Utility functions
|    └── index.js       # Main entry point
|    └── app.js         # Express app
|    └── README.md      # Project documentation
├── .env   # Sample environment variables
```
