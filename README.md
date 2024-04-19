# Application for Storing Blog Data Using Redis Cache with Node.js
## Node.js Blog Application

This application performs simple blog data storage using Node.js and Redis. The application caches the data for a particular blog and retrieves it from the cache, or retrieves it from the MySQL database if it is not in the cache. On the first request, since the data is not in the cache, it is retrieved from the MySQL database and sent to the user and written to the cache.

## Getting Started

These steps outline what is required to run the application on a local machine.

### Prerequisites

- Node.js
- Redis
- MySQL

### Installation

1. Navigate to the project directory:

    ```
    cd nodejs-blog-app
    ```

2. Install dependencies:

    ```
    npm install
    ```

3. Start MySQL and Redis servers.

4. Create a `.env` file and set up MySQL connection details and other necessary environment variables:

    ```
    MYSQL_HOST=localhost
    MYSQL_USER=root
    MYSQL_PASSWORD=your_mysql_password
    MYSQL_DATABASE=blog

    REDIS_HOST=localhost
    REDIS_PORT=6379
    ```

5. Start the application:

    ```
    npm start
    ```

The application runs by default on port `5000`.

## Usage

The application retrieves the data of a specific blog using the `/blogs/:id` endpoint. For example, you can retrieve the data of a blog by visiting the URL `http://localhost:5000/blogs/1`. 
