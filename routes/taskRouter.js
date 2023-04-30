const express = require('express');
const router = express.Router();

const {
    getTaskList,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controller/taskController");

// localhost:3030/api...
router.get("/tasklist", getTaskList);
router.post("/createTask", createTask);
router.get("/getTaskById/:id", getTaskById);
router.put("/updateTask/:id", updateTask);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;