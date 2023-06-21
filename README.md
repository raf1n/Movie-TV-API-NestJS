# Movie/TV Show API

This is a Node.js application that provides an API for managing movies and TV shows. It uses a community-supported open-source Node.js framework NestJS and a NoSQL database MongoDB. The API includes authentication using JWT (JSON Web Tokens) stored in cookies and implements role-based access control.

## Prerequisites

Before running the application, ensure you have the following dependencies installed:

- Node.js (LTS version)
- Docker (optional, for running the application in a containerized environment)

## Getting Started

To set up the development environment and run the application locally, follow these steps:

1 . Clone the repository:

```
git clone git clone https://github.com/raf1n/SS-BACKEND-TASK-Rahim-Uddin-Rafin.git
cd SS-BACKEND-TASK-Rahim-Uddin-Rafin/
```

2 . Install the dependencies:

    npm i / yarn

3 . Set Environment Variables:

    # MongoDB connection string
    DATABASE_URL=mongodb://0.0.0.0:27017/movie-tv-db / <Your MongoDB URI>

    # JWT secret key
    JWT_SECRET_KEY= <your-secret-key>

    # JWT Expries in
    JWT_EXPIRES=3d

    # Server port
    PORT=8000

4 . Start the development server:

    npm run start:dev / yarn start:dev

The API's will be accessible at http://localhost:8000.

# Authentication and Authorization

The API implements stateless authentication using JWT (JSON Web Tokens) stored in cookies. The authentication module provides two endpoints: **/auth/register** for user registration and **/auth/login** for user login.

- Registration: Send a POST request to /auth/register with the required user details in the request body (name, email, password, role = "user" | "admin"). The password is securely hashed using bcrypt. Upon successful registration, a JWT token will be stored in a secure HTTP-only cookie.

- Login: Send a POST request to /auth/login with the user's credentials (email and password) in the request body. The password is compared using bcrypt for secure authentication. If the credentials are valid, a JWT token will be stored in a secure HTTP-only cookie.

To access protected routes, the JWT token have to be present in the request cookies. Certain routes are restricted to specific user roles (admin role). The RolesGuard is used to enforce role-based access control.

# API Endpoints

The API provides the following endpoints:

- GET /movies-tv-shows : Get a list of all movies and TV shows.
- GET /movies-tv-shows/:id : Get details of a specific movie or TV show.
- POST /movies-tv-shows : Create a new movie or TV show (**restricted to admin role**).
  - Request Body (JSON):
  ```json
  {
    "title": "string",
    "runtime": "number",
    "synopsis": "string",
    "actors": ["string"],
    "crewMembers": ["string"],
    "producers": ["string"]
  }
  ```
- PATCH /movies-tv-shows/:id : Update details of a specific movie or TV show (**restricted to admin role**).
  - Request Body (JSON):
  ```json
  {
    "title": "string",
    "runtime": "number",
    "synopsis": "string",
    "actors": ["string"],
    "crewMembers": ["string"],
    "producers": ["string"]
  }
  ```
- DELETE /movies-tv-shows/:id : Delete a specific movie or TV show (**restricted to admin role**).

**_Please note that the API requires authentication to access the endpoints. Ensure that you have register or login before accessing the API's, which will include the JWT token in the request cookies._**

# Docker

You can also run the application using Docker. To do so, follow these steps:

### Option 1

1 . Build the Docker image:

    docker build -t movie-tv-api .

2 . Start the Docker container:

    docker run -p 8000:8000 -d movie-tv-api

The API will be accessible at http://localhost:8000.

### Option 2

1 . Make sure you have Docker Compose installed. You can install it separately or use the version that comes bundled with Docker Desktop.

2 . Open a terminal or command prompt, navigate to your project's root directory (where the docker-compose.yml file is located), and run the following command to start the containers:

    docker-compose up

The API will be accessible at http://localhost:8000.
