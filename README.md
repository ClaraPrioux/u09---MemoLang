# MemoLang - u09

MemoLang is a language learning application designed to help users memorize words and their translations. The application supports both English and Swedish, allowing users to practice and track their vocabulary effectively.

## Table of Contents

- [Materials ChasAcademy Evaluation](#materials-for-chasacademy-evaluation)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Frontend Documentation](#frontend-documentation)
- [Backend Documentation](#backend-documentation)
- [Deployment](#deployment)

## Materials for ChasAcademy Evaluation

This section provides resources and materials to evaluate the MemoLang project.

- **UX and UI work**: [Figma design link](https://www.figma.com/design/B6pE7yx3YyfqPs2ghf3qNX/MemoLang?node-id=0-1&t=8ycTKMCu5f3AcQqn-1)
- **Database Diagram**: [MongoDb Diagram](./backend/diagram-mongodb.drawio.svg)
- **Data Source**: [Folkets Lexikon](https://folkets-lexikon.csc.kth.se/folkets/om.html)
- **Script for XML to CSV Conversion**: [Conversion Script Documentation](./backend/doc-java.md)
- **GitHub Project Board**: [Project Kanban Board](https://github.com/ClaraPrioux/u09---MemoLang/projects?query=is%3Aopen)
- **Frontend Deployment**: [Netlify Deployment](https://u09-memolang.netlify.app/)
- **Backend Deployment**: [Render Deployment](https://u09-memolang.onrender.com)

---

# Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ClaraPrioux/u09---MemoLang.git
   cd u09---MemoLang
   ```

2. **Install dependencies:**

   - **Frontend:**
     ```bash
     cd frontend
     npm install
     ```
   - **Backend:**
     ```bash
     cd backend
     npm install
     ```

3. **Set environment variables:**  
    Create a `.env` file in the backend folder and add the required variables (PORT,
   MONGODB_URI, and SECRET_KEY).

4. **Run the application:**
   - **Start the backend server:**
     ```bash
     cd backend
     npm run dev
     ```
   - **Start the frontend server:**
     ```bash
     cd frontend
     npm run dev
     ```

# Usage

After setting up the project, navigate to `http://localhost:5173` in your browser to access the application. Here are some key features:

- Register and log in to your account.
- Add new words and their translations.
- Retrieve saved words and practice your vocabulary.
  <br><br>

# API Documentation

### Base URL

`http://localhost:3000/`

### Endpoints

- [Registration](#user---registration)
- [Login](#user---login)
- [Get Suggestions](#word---getsuggestions)
- [Add word](#word---add-a-word)
- [Get context](#word---get-context)
- [Get today's words](#word---get-todays-words)
- [Mark word as completed](#word---mark-word-as-completed)
- [Get all users (Admin)](#admin---get-users)
- [Create user (Admin)](#admin---create-user)
- [Update user (Admin)](#admin---update-user)
- [Delete user (Admin)](#admin---delete-user)
- [Get user information](#profile---get-user-information)
- [Get user's words](#profile---get-users-words)
- [Get Words Created Per Week](#profile---get-words-created-per-week)
- [Get Role](#profile---get-role)

## User - Registration

- **Endpoint**: `/auth/register`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": ""
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "token": "jwt_token"
  }
  ```
  - **Error**:
  ```json
  {
    "error": "User already exists"
  }
  ```

## User - Login

- **Endpoint**: `/auth/login`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "token": "jwt_token"
  }
  ```
  - **Error**:
  ```json
  {
    "error": "Invalid email" or "Invalid password"
  }
  ```

## Word - GetSuggestions

- **Endpoint**: `/word/getSuggestions`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "word": "cat"
  }
  ```
- **Response**:
  - **Success**:
  ```json
  {
    "suggestions": [
      {
        "word": "cat",
        "translation": "katt",
        "word_id": "66efed896bd8c70b233381bd"
      }
    ]
  }
  ```
  - **No word suggested**:
  ```json
  {
    "suggestions": []
  }
  ```

## Word - Add a word

- **Endpoint**: `/word/add`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "wordId": "string",
    "context": "string"
  }
  ```
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "message": "Word and translation saved!"
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error saving word",
    "error": "string"
  }
  ```

## Word - Get context

- **Endpoint**: `/word/getContext`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "wordId": "string"
  }
  ```
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "context": "Word's context"
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error fetching context"
  }
  ```

## Word - Get today's words

- **Endpoint**: `/word/getTodaysWords`
- **Method**: `GET`
- **Headers**:

  - `Authorization`: `Bearer jwt_token`

- **Response**:
  - **Success**:
  ```json
  {
    "todaysWords": [
      {
        "word": "cat",
        "translation": "katt",
        "word_id": "66efed896bd8c70b233381bd",
        "review_day": "date_1"
      }
    ]
  }
  ```
  - **No Words**:
  ```json
  {
    "todaysWords": []
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error returning today's words",
    "error": "string"
  }
  ```

## Word - Mark word as completed

- **Endpoint**: `/word/markAsCompletedForDay`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "word_id": "string",
    "review_day": "date_1 | date_7 | date_30"
  }
  ```
- **Headers**:

  - `Authorization`: `Bearer jwt_token`

- **Response**:
  - **Success**:
  ```json
  {
    "message": "Word marked as completed for date_1"
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error marking word as completed for day",
    "error": "string"
  }
  ```

## Admin - Get users

- **Endpoint**: `/admin/getUsers`
- **Method**: `GET`
- **Headers**:

  - `Authorization`: `Bearer jwt_token` (admin)

- **Response**:
  - **Success**:
  ```json
  {
    "usersInfo": [
      {
        "user_id": "string",
        "username": "string",
        "email": "string",
        "role": "string"
      }
    ]
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error fetching users",
    "error": "string"
  }
  ```

## Admin - Create user

- **Endpoint**: `/admin/createUser`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Headers**:

  - `Authorization`: `Bearer jwt_token` (admin)

- **Response**:
  - **Success**:
  ```json
  {
    "message": "User created successfully",
    "user": {
      "username": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
  - **Error**:
  ```json
  {
    "message": "User already exists" | "Error creating user",
    "error": "string"
  }
  ```

## Admin - Update user

- **Endpoint**: `/admin/updateUser`
- **Method**: `PUT`
- **Request Body**:
  ```json
  {
    "user_id": "string",
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "string"
  }
  ```
- **Headers**:

  - `Authorization`: `Bearer jwt_token` (admin)

- **Response**:
  - **Success**:
  ```json
  {
    "message": "User updated successfully",
    "user": {
      "username": "string",
      "email": "string",
      "role": "string"
    }
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error updating user",
    "error": "string"
  }
  ```

## Admin - Delete user

- **Endpoint**: `/admin/deleteUser`
- **Method**: `DELETE`
- **Request Body**:
  ```json
  {
    "user_id": "string"
  }
  ```
- **Headers**:

  - `Authorization`: `Bearer jwt_token` (admin)

- **Response**:
  - **Success**:
  ```json
  {
    "message": "User deleted successfully",
    "user": {
      "user_id": "string"
    }
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error deleting user",
    "error": "string"
  }
  ```

## Profile - Get user information

- **Endpoint**: `/profile/getUser`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "userInfo": {
      "username": "string"
    }
  }
  ```
  - **Error**:
  ```json
  {
    "message": "User not found!" or "No token provided!" or "Error fetching user",
    "error": "string"
  }
  ```

## Profile - Get user's words

- **Endpoint**: `/profile/getWords`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "words": [
      {
        "_id": "string",
        "word": "string",
        "translation": "string"
      }
    ]
  }
  ```
  - **No words found**:
  ```json
  {
    "message": "User hasn't added any words yet!" or "No words found for the user!"
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error fetching user words",
    "error": "string"
  }
  ```

## Profile - Get Words Created Per Week

- **Endpoint**: `/profile/getWordsCreatedPerWeek`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "wordsPerWeek": [
      {
        "_id": "number", // week number
        "wordCount": "number"
      }
    ]
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error fetching user's words",
    "error": "string"
  }
  ```

## Profile - Get Role

- **Endpoint**: `/profile/role`
- **Method**: `GET`
- **Headers**:
  - `Authorization`: `Bearer jwt_token`
- **Response**:
  - **Success**:
  ```json
  {
    "user_role": "string"
  }
  ```
  - **Error**:
  ```json
  {
    "message": "Error fetching user role",
    "error": "string"
  }
  ```

# Frontend Documentation

### Folder Structure

```
frontend/
├── public/
├── src/
│   ├── assets/       # Images
│   ├── components/   # Reusable components
│   ├── pages/        # Page components
│   ├── utils/        # Utility functions
│   └── App.tsx       # Main app component
```

### Routing

In this application, we use the Router component from react-router-dom to handle routing. The routes are set up inside a Router wrapper, and the main routes are defined using the Routes and Route components.

```tsx
<Router>
  <Navbar />
  <Routes>
    <Route path="/" exact component={HomePage} />
    {/* Protected routes */}

    {/* Public routes */}

    {/* Admin route with nested dashboard */}
  </Routes>
</Router>
```

## Backend Documentation

### Folder Structure

```
backend/
├── config/
│   ├── config.ts
│   └── dbConfig.ts
├── middlewares/
│   ├── adminMiddleware.ts
│   └── authMiddleware.ts
├── models/
│   ├── User.ts
│   └── Users_word.ts
├── routes/          # API routes
│   ├── adminRoutes.ts
│   ├── authRoutes.ts
│   └── wordsRoutes.ts
└── index.ts      # main file
```

## Deployment

Both the localhost and deployment environments have been set up using Continuous Integration/Continuous Deployment (CI/CD) practices.

The frontend is deployed on Netlify: [Netlify Deployment](https://u09-memolang.netlify.app/)<br>
The backend is deployed on Render: [Render Deployment](https://u09-memolang.onrender.com)
