# MERNeats

MERNeats is a full-stack web application designed to facilitate food ordering. It leverages the MERN stack (MongoDB, Express, React, Node.js) and integrates with various third-party services for authentication and payment processing.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

## Features

- User authentication with Auth0
- Restaurant management
- Order processing with Stripe
- Responsive design with Shadcn and Tailwind CSS
- Image uploading using Cloudinary

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Shadcn, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: Auth0
- **Payment Processing**: Stripe

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/saai-syvendra/merneats.git
    cd merneats
    ```

2. Install dependencies for both frontend and backend:

    ```bash
    cd frontend
    npm install
    cd ../backend
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the `backend` directory with the following variables:

        ```env
        MONGODB_CONNECTION_STRING=your_mongodb_connection_string
        CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
        CLOUDINARY_API_KEY=your_cloudinary_api_key
        CLOUDINARY_API_SECRET=your_cloudinary_api_secret
        AUTH0_AUDIENCE=your_auth0_audience
        AUTH0_ISSUER_BASE_URL=your_auth0_issuer_base_url
        ```

    - Create a `.env` file in the `frontend` directory with the following variables:

        ```e
        VITE_AUTH0_DOMAIN=your_auth0_domain
        VITE_AUTH0_CLIENT_ID=your_auth0_client_id
        VITE_AUTH0_CALLBACK_URL=your_auth0_callback_url
        VITE_AUTH0_AUDIENCE=your_auth0_audience
        VITE_API_BASE_URL=your_api_base_url
        ```

    Make sure to replace the placeholder values with your actual configuration details.

## Usage

### Running the Application

1. Start the backend server:

    ```bash
    cd backend
    npm run dev
    ```

2. Start the frontend development server:

    ```bash
    cd frontend
    npm run dev
    ```

3. Open your browser and navigate to `http://localhost:3000`.

## Scripts

### Frontend

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Builds the application for production.
- `npm run lint`: Lints the codebase using ESLint.

### Backend

- `npm run dev`: Starts the server with nodemon for development.
- `npm run build`: Compiles TypeScript to JavaScript.
- `npm run start`: Runs the compiled JavaScript files.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
