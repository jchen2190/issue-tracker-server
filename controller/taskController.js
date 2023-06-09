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
        const tasks = await Task.find({})
        const nextTaskNo = tasks[tasks.length-1].taskNo ? tasks[tasks.length-1].taskNo + 1 : 1;

        let newTask = {
            taskNo: nextTaskNo,
            status: "open",
            created: new Date(),
            subject: req.body.subject,
            description: req.body.description,
            importance: req.body.importance,
            author: req.body.author,
            assignTo: req.body.assignTo,
            dueDate: req.body.dueDate
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
            status: req.body.status,
            created: req.body.created,
            subject: req.body.subject,
            description: req.body.description,
            importance: req.body.importance,
            author: req.body.author,
            assignTo: req.body.assignTo,
            dueDate: req.body.dueDate
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

async function deleteTask(req, res) {
    try {
        let targetTask = req.params.id;
        let deletedTask = await Task.deleteOne({_id: targetTask});
        res.json({
            message: "success",
            payload: deletedTask
        })
    } catch (error) {
        let errorObj = {
            message: "deleteTask failure",
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
    updateTask,
    deleteTask
}