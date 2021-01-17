## Task Manager API

#### dev:

POST http://localhost:3000/users

```
body: {
   "name": "Karina",
   "email": "karinabernardin@gmail.com",
   "password": "1j26d8d9esl" 
}
```

GET http://localhost:3000/users

GET http://localhost:3000/users/:id

POST http://localhost:3000/tasks

```
body: {
    "description": "Finish course"
}
```

GET http://localhost:3000/tasks

GET http://localhost:3000/tasks/:id


