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
            message: "getTaskList failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function createTask (req, res) {
    try {
        let newTask = {
            subject: req.body.subject,
            description: req.body.description,
            importance: req.body.importance
        }
        await Task.create(newTask);
        res.json({
            message: "success",
            payload: newTask
        })
    } catch (error) {
        let errorObj = {
            message: "createTask failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getTaskList,
    createTask
}