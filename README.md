
# The Hugo Hotel

This is a project hotel dashboard consisting of a Python (FastAPI) backend and a JavaScript (React) frontend with an in-memory DB.

(vite, axios, uvicorn)

## Installation Guide

This application runs on **http://localhost:5173**

(backend on **http://localhost:8000/rooms**)

---

### Backend

**Going to the backend directory:**
```
cd backend
```

**Installing necessary Python dependencies:**
```
pip install -r ./requirements.txt
```
(You may need to replace `pip` with `pip3` if on macOS)

**Running the backend in dev mode:**


```
fastapi dev
```

**Testing:**
(Consists of 5 tests

```
pytest test_main.py
```

---

### Frontend

**Going to the frontend directory:**
```
cd frontend
```
**Installing necessary node dependencies:**
```
npm install
```

**Running the frontend in dev mode:**
```
npm run dev
```

---

### Improvements (What I would do if carrying on)
- Mobile/different screen size compatibility
- Better facilities feature
- More options for navigation
- Slightly cleaner code

### Routes

```
/rooms
/create-room
/update-room{roomId}
```


