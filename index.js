const express = require("express");
const app = express();
const connectToMongoDB = require("./database/mongodb");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
// const sessions = require("express-session"); // store on server
const sessions = require('cookie-session'); // store on client
require("dotenv").config();

app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors({
    // "origin": "http://localhost:3000",
    "origin": "https://jchen2190.github.io/",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "credentials": true,
    "optionSuccessStatus": 200
}));
app.use(cookieParser(process.env.COOKIE_SECRET));

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    cookie: {
        maxAge: oneDay,
        secure: false
        },
    resave: true,
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