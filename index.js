const express = require("express");
const app = express();
require("dotenv").config();
const connectToMongoDB = require("./database/mongodb");
const logger = require("morgan");

app.use(logger("dev")); 
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const Issue = require("./models/issueModel");

async function getIssueList(req, res) {
    try {
        let results = await Issue.find({})

        res.json({
            message: "success",
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: "get all issues failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

// localhost:3030/api/...
app.use("/api", getIssueList);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
    connectToMongoDB();
})