# Front Core Admin

This is the frontend application for Core Entities Admin.
Built with **React**, **TypeScript**, and **Vite**. The application allows users to manage entities and employees and connects with the backend API for CRUD operations and authentication.

## Requirements and Configuration

Ensure the following tools are installed on your system:
- [Node.js](https://nodejs.org/) (version 18 or later)
- [npm](https://www.npmjs.com/)

## Installation and Execution

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project folder: `cd front-core-admin`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. To build for production: `npm run build`


## App flow

Login Page
![Screenshot 2024-09-30 at 9 13 30 AM](https://github.com/user-attachments/assets/eaa7df8f-9e26-442e-a85d-441c9f94d72e)

Home Page
![Screenshot 2024-09-30 at 9 16 18 AM](https://github.com/user-attachments/assets/f5961d4a-7b7b-4899-a1a4-67998e927152)

Create Entity Modal
![Screenshot 2024-09-30 at 9 16 50 AM](https://github.com/user-attachments/assets/62346f8b-358d-4c2b-9288-26eb7e05615e)

## Folder Structure

The folder structure of the project follows a modular approach to keep the code maintainable and scalable.

Using split layers, services to handle http requests, hooks to handling component life cicle data and pages to show the view.

front-core-admin/
├── src/                 # Source code of the application
│   ├── assets/          # Static assets like images, fonts, etc.
│   ├── layouts/         # Layout components (e.g., MainLayout, Nav)
│   ├── modules/         # Modularized features
│   │   ├── auth/        # Authentication module
│   │   │   ├── hooks/
│   │   │   ├── pages/
│   │   │   └── services/
│   │   ├── home/        # Home module for entity management
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── page/
│   │   │   └── services/
│   ├── theme/           # Custom MUI theme and configurations
│   ├── App.css          # Global CSS styles
│   ├── App.tsx          # Main app component
│   ├── index.css        # Global CSS
│   ├── main.tsx         # Entry point of the React application

## Environment Variables

To run this project, you will need to configure the following environment variable in a .env file at the root level:

VITE_API_URL: The base URL of the backend API.

## Libraries and Tools


React: Frontend library for building user interfaces.
React Router: Handles the routing of the application.
React Hook Form: Form management library used for handling form state and validation.
Material UI (MUI): UI component library for building modern web applications.
Yup: Schema validation library used with React Hook Form.
Axios: For making HTTP requests to the backend API.
