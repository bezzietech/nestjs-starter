## Starter App with NestJS Swagger, ClerkJS, and Mongoose

<p align="center" style="display:flex; gap:4px; width:100%; justify-content:space-between;">
  <a href="http://bezzietech.com" target="blank"><img src="https://bezzietech.com/img/Logo.png" width="150" height="150" alt="BezzieTech Logo" /></a>
  <a href="http://bezzietech.com" target="blank"><img src="https://bezzietech.com/img/clerk-logo.svg" width="120" height="120" alt="Clerk Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" height="120" alt="Nest Logo" /></a>
  <a href="http://nestjs.com/" target="blank"><img src="https://bezzietech.com/img/swagger-logo.svg" width="200" height="120" alt="Swagger Logo" /></a>
      <a href="http://nestjs.com/" target="blank"><img src="https://bezzietech.com/img/mongodb.svg" width="200" height="120" alt="Mongo Logo" /></a>
</p>
This repository contains a starter application built with NestJS 10.0.1 and TypeScript. It integrates Swagger for API documentation, ClerkJS for authentication, and Mongoose as the database ORM.

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (version 16 or above)
- MongoDB (installed and running)

## Getting Started

To get started with this starter app, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/bezzietech/nestjs-starter-app.git
   ```

2. Install the dependencies:

   ```bash
   cd nestjs-starter-app
   npm install
   ```

3. Configure the environment variables:

   Create a `.env` file in the project root directory and add the following environment variables:

   ```plaintext
   MONGODB_URI=your-mongodb-uri
   CLERK_API_KEY=your-clerk-api-key
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

   This command will start the application in development mode. You can access it at `http://localhost:3000`.

## Project Structure

The project follows a modular structure and includes the following directories:

- `src`: Contains the application source code.
  - `controllers`: Contains the controllers that handle incoming HTTP requests.
  - `dtos`: Contains the data transfer objects used for request and response validation.
  - `services`: Contains the business logic services.
- `test`: Contains the unit tests for the application.

## Swagger Documentation

This starter app includes Swagger for API documentation. Once the application is running, you can access the Swagger UI at `http://localhost:3000/swagger`. The Swagger UI provides a detailed documentation of the available endpoints, request/response schemas, and allows you to test the APIs directly from the interface.

## ClerkJS Integration

ClerkJS is used for authentication in this starter app. It provides a secure and customizable user authentication and management system. To integrate ClerkJS further into your application, you can explore the `src/auth` directory, which contains the necessary configuration and middleware for handling user authentication.

## Mongoose Integration

Mongoose is used as the database ORM in this starter app. The `src/models` directory contains the Mongoose models representing your application's data structures. You can create additional models or modify the existing ones according to your application's requirements.

## Additional Information

For more information on how to use NestJS, Swagger, ClerkJS, and Mongoose, please refer to their respective documentation:

- NestJS: [https://docs.nestjs.com](https://docs.nestjs.com)
- Swagger: [https://swagger.io](https://swagger.io)
- ClerkJS: [https://docs.clerk.dev](https://docs.clerk.dev)
- Mongoose: [https://mongoosejs.com](https://mongoosejs.com)

## License

This starter app is licensed under the [MIT License](LICENSE). Feel free to modify and use it to kickstart your NestJS projects!
