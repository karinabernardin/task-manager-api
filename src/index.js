const express = require('express');
const { establishDatabaseConnection } = require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

establishDatabaseConnection('task-manager-api');

// middleware used for site maintenance. next() is not called
// used for every route in the application
//app.use((req, res, next) => {
//    res.status(503).send('Site is currently down. Check back soon!');
//});

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=> {
    console.log('Server is up on port ' + port);
});