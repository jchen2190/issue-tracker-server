const express = require("express");
const app = express();
const connectToMongoDB = require("./database/mongodb");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessions = require("express-session");

const oneDay = 1000 * 60 * 60 * 24
app.use(sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: false,
    cookie: { maxAge: oneDay },
    resave: false
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