const express = require("express");
const app = express();
require("dotenv").config();
const connectToMongoDB = require("./database/mongodb");
const cors = require("cors");
const logger = require("morgan");

app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const corsOptions = {
    origin: "*",
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

const taskRouter = require("./routes/taskRouter");
app.use("/api", taskRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
    connectToMongoDB();
})