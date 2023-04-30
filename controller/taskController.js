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

async function getTaskById(req, res) {
    try {
        let foundTask = await Task.findOne({ _id: req.params.id })

        res.json({
            message: "success",
            payload: foundTask
        })
    } catch (error) {
        let errorObj = {
            message: "getTaskById failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function updateTask (req, res) {
    try {
        let targetTask = await Task.findOne({ _id: req.params.id });

        let updatedTask = {
            _id: targetTask._id,
            subject: req.body.subject,
            description: req.body.description,
            importance: req.body.importance
        }

        await Task.updateOne(
            { _id: req.params.id },
            { $set: updatedTask },
            { upsert: true }
        )

        res.json({
            message: "success",
            payload: updateTask
        })
    } catch (error) {
        let errorObj = {
            message: "updateTask failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    getTaskList,
    createTask,
    getTaskById,
    updateTask
}