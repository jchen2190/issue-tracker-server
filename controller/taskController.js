const Task = require("../models/taskModel");

async function getTaskList(req, res) {
    try {
        let results = await Task.find({})

        res.json({
            message: "success",
            payload: results
        })
    } catch (error) {
        let errorObj = {
            message: "get all tasks failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getTaskList
}