# Blog API

This is a RESTful API for managing articles and user registration in a blog application. It is built with ExpressJS, TypeScript, NodeJS, and MongoDB with caching enabled by Redis.

# Documentation

The API documentation can be found at https://blog-it.render.com/api-docs. The documentation contains detailed information on the different endpoints, request parameters, and response formats.

# Getting Started

To run the API on your local machine, follow these steps:

## Clone the repository to your local machine

```sh
git clone https://github.com/your-username/blog-api.git
```

Navigate to the backend folder

```sh
cd backend
```

Install the required packages using npm

```sh
npm ci
```

Start the server

```sh
npm start
```

The app will now be running on localhost:3000.

# Hosting

The API is also hosted on https://blog-it.render.com. You can access the documentation for the API at blog-it.render.com/api-docs.

## Endpoints

The following are the endpoints that can be accessed through this API:

- POST /users/register - Register a new user
- POST /users/login - Login an existing user
- GET /users/profile - Retrieve the profile of the logged in user
- POST /users/profile/update - Update the profile of the logged in user
- GET /articles - Retrieve all articles
- GET /articles/search - Search articles by category or tags
- POST /articles - Create a new article
- GET /articles/:id - Retrieve a specific article
- PUT /articles/:id/like - Like a specific article
- PUT /articles/:id/dislike - Dislike a specific article
- PUT /articles/:id/comment - Comment on a specific article

# Conclusion

This API provides a simple and efficient way to manage articles and user registration for a blog application. With detailed documentation and caching provided by Redis, it ensures that the application runs smoothly and efficiently.
