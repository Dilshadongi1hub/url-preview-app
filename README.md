# URL Preview Application

A full-stack URL Preview Application built using **React.js**, **FastAPI**, **SQLite**, and **JWT Authentication**. This application allows users to create an account, log in securely, generate website preview images from URLs, view saved previews, and delete them.

---

## Features

- User Signup
- User Login with JWT Authentication
- Protected Dashboard
- Generate Website Preview
- Save Preview to Database
- View All Saved Previews
- Delete Preview
- Responsive User Interface

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- CSS

### Backend
- FastAPI
- SQLAlchemy
- SQLite
- JWT Authentication
- Passlib (Password Hashing)

---

## Project Structure

```
url-preview-app
│
├── backend
│   ├── app
│   │   ├── database
│   │   ├── models
│   │   ├── routers
│   │   ├── schemas
│   │   └── utils
│   ├── main.py
│   └── requirements.txt
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   └── App.jsx
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/Dilshadongi1hub/url-preview-app.git
```

---

### Backend Setup

```bash
cd backend
```

Create Virtual Environment

```bash
python -m venv venv
```

Activate Virtual Environment

Windows

```bash
venv\Scripts\activate
```

Install Dependencies

```bash
pip install -r requirements.txt
```

Run Backend

```bash
uvicorn main:app --reload
```

Backend URL

```
http://127.0.0.1:8000
```

Swagger Documentation

```
http://127.0.0.1:8000/docs
```

---

### Frontend Setup

```bash
cd frontend
```

Install Packages

```bash
npm install
```

Run Frontend

```bash
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /auth/signup | Create Account |
| POST | /auth/login | Login User |

---

### Preview

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /preview | Save Preview |
| GET | /preview | Get All Previews |
| DELETE | /preview/{id} | Delete Preview |

---

## Future Improvements

- User-specific Preview History
- Dark Mode
- Search Functionality
- Edit Preview
- Cloud Database
- Docker Support

---

## Author

**MO DILSHAD ANSARI**

GitHub

https://github.com/Dilshadongi1hub
