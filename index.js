const express = require("express");
const app = express();
const connectToMongoDB = require("./database/mongodb");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const sessions = require("express-session"); // store on server
// const sessions = require('cookie-session'); // store on client
const MemoryStore = require('memorystore')(sessions); // prevents memory leak in render
require("dotenv").config();

app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors({
    // "origin": "http://localhost:3000",
    "origin": "https://issue-tracker-client-dja8.onrender.com",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
    "optionSuccessStatus": 200
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: oneDay,
        // secure: false
    },
    store: new MemoryStore({
        checkPeriod: oneDay
    })
}))

const taskRouter = require("./routes/taskRouter");
app.use("/api/issue", taskRouter);

const userRouter = require("./routes/userRouter");
app.use("/api/user", userRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
    connectToMongoDB();
})