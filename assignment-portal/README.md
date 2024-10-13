### **Assignment Submission Portal**

## **Description**

- The **Assignment Submission Portal** is a backend system built with **Node.js and MongoDB** that allows users to submit assignments, and admins to accept or reject those assignments. The portal supports user and admin registrations, logins, task submission, and assignment status management.

### **Features**

- **Users:**

  - Register and log in.

  - Upload assignments.

  - View available admins to whom tasks can be submitted.

- **Admins:**

  - Register and log in.

  - View all assignments assigned to them.

  - Accept or reject assignments.

- **Authentication:**

  - JSON Web Token (JWT) authentication is implemented to secure routes.

### Tech Stack

- **Node.js** - JavaScript runtime.

- **Express.js** - Web framework for Node.js.

- **MongoDB** - NoSQL database.

- **Mongoose** - MongoDB object modeling for Node.js.

- **JWT** - JSON Web Token for secure authentication.

- **bcrypt** - For hashing passwords.

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)

- MongoDB (or use MongoDB Atlas)

- Postman (Optional, for testing the API)

### Project Setup

1. ## Clone the repository:

```bash
git clone https://github.com/yourusername/assignment-portal.git
cd assignment-portal
```

2. ## Install dependencies:

```bash
npm install
```

3. ## Configure environment variables:

Create a `.env` file in the project root and add the following values:

```bash
DB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/assignmentPortal
JWT_SECRET=your_jwt_secret_key
```

Replace `<username>` and `<password>` with your MongoDB credentials.

4. ## Start the server:

```bash
npm run start
```

The server will run on `http://localhost:5000`.

## Folder Structure

```bash
assignment-portal/
│
├── controllers/
│   ├── authController.js      # Handles user and admin registration/login
│   ├── assignmentController.js # Handles assignment submission, accept/reject actions
│
├── models/
│   ├── userModel.js           # Defines schema for users (admin & normal users)
│   ├── assignmentModel.js     # Defines schema for assignments
│
├── middlewares/
│   ├── authMiddleware.js      # Verifies JWT tokens
│
├── routes/
│   ├── userRoutes.js          # Routes for user-related actions
│   ├── adminRoutes.js         # Routes for admin-related actions
│
├── config/
│   ├── db.js                  # MongoDB connection config
│
├── .env                       # Environment variables (DB_URL, JWT_SECRET)
├── server.js                  # Main entry point
└── README.md                  # Documentation on how to set up and run the system
```

## API Endpoints

**User Endpoints**

- **POST** `/api/users/register` - Register a new user

  - Request Body:

  ```json
  {
    "name": "Soumik",
    "email": "soumik@example.com",
    "password": "password123",
    "isAdmin": false
  }
  ```

- **POST** `/api/users/login` - User login

  - Request Body:

  ```json
  {
    "email": "soumik@example.com",
    "password": "password123"
  }
  ```

  - Response:

  ```json
  {
    "token": "JWT_TOKEN_HERE"
  }
  ```

- **POST** `/api/users/upload` - Upload an assignment

  - Authorization: `Bearer JWT_TOKEN`

  - Request Body:

  ```json
  {
    "task": "Complete Hello World program",
    "admin": "ADMIN_ID_HERE"
  }
  ```

- **GET** `/api/users/admins` - Fetch all admins.

**Admin Endpoints**

- **POST** `/api/admins/register` - Register a new admin.

  - Request Body:

  ```json
  {
    "name": "Alok",
    "email": "alok@example.com",
    "password": "adminpassword123",
    "isAdmin": true
  }
  ```

- **POST** `/api/admins/login` - Admin login

  - Request Body:

  ```json
  {
    "email": "alok@example.com",
    "password": "adminpassword123"
  }
  ```

  - Response:

  ```json
  {
    "token": "JWT_TOKEN_HERE"
  }
  ```

- **GET** `/api/admins/assignments` - View all assignments tagged to the admin

  - Authorization: `Bearer JWT_TOKEN`

  - Response:

  ```json
  [
    {
      "_id": "ASSIGNMENT_ID",
      "task": "Complete Hello World program",
      "userId": {
        "_id": "USER_ID",
        "name": "Soumik"
      },
      "status": "pending",
      "createdAt": "2024-10-13T10:15:03.650Z"
    }
  ]
  ```

- **POST** `/api/admins/assignments/:id/accept` - Accept an assignment

  - Authorization: `Bearer JWT_TOKEN`

  - Response:

  ```json
  {
    "_id": "ASSIGNMENT_ID",
    "task": "Complete Hello World program",
    "status": "accepted"
  }
  ```

- **POST** `/api/admins/assignments/:id/reject` - Reject an assignment

  - Authorization: `Bearer JWT_TOKEN`

  - Response:

  ```json
  {
    "_id": "ASSIGNMENT_ID",
    "task": "Complete Hello World program",
    "status": "rejected"
  }
  ```

## Running Tests

You can use **Postman** to test the various API endpoints. For each request:

1.Use the appropriate HTTP method (POST/GET).

2.Provide necessary headers (e.g., JWT token for authenticated routes).

3.Send the request body in JSON format (where applicable).

## Future Enhancements

- **OAuth2 Authentication:** Integrate Google or GitHub login using Passport.js.

- **File Uploads:** Implement file uploads for assignments using Multer and store them in cloud storage like AWS S3.

- **Email Notifications:** Notify users via email when their assignment status changes.

- **Pagination:** Add pagination support for viewing assignments, especially for admins managing a large number of assignments.

## Contact

Feel free to reach out to me at:-

- **Email:** hritikkumar09grd@gmail.com

- **GitHub:** github.com/hritik-6918
