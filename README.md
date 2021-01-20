## Task Manager API

#### dev:

POST /users

```
body: {
   "name": "Karina",
   "email": "karinabernardin@gmail.com",
   "password": "1j26d8d9esl" 
}
```

GET /users

GET /users/:id

PATCH /users/:id

```
body: {
   "name": "Karina",
   "password": "54141543545871" 
}
```

DELETE /users/:id

POST/tasks

```
body: {
    "description": "Finish course"
}
```

GET /tasks

GET /tasks/:id

PATCH /tasks/:id

```
body: {
   "completed": true,
}

DELETE /tasks/:id