# MERN E-commerce App

A full-stack e-commerce web application built with MongoDB, Express.js, React, and Node.js.

## Features

- Product listings with categories
- Shopping cart functionality
- User authentication (login/signup)
- Order placement and tracking
- Admin panel for managing products
- Image upload with Cloudinary
- RESTful API

## Tech Stack

**Frontend:**
- React
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB
- Cloudinary (image storage)

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   └── routes/
│   └── server.js
└── frontend/
    └── src/
        ├── components/
        ├── context/
        └── pages/
```

## Getting Started

1. Clone this repository
2. Install dependencies in both `backend` and `frontend` folders:
   ```
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Create a `.env` file in the `backend` folder with your MongoDB URI and other secret keys
4. Run the backend:
   ```
   cd backend
   npm start
   ```
5. Run the frontend:
   ```
   cd frontend
   npm run dev
   ```

## Author

Babar Ali
