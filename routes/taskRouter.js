const express = require('express');
const router = express.Router();

const {
    getTaskList,
    createTask,
    updateTask
} = require("../controller/taskController");

// localhost:3030/api...
router.get("/tasklist", getTaskList);
router.post("/createTask", createTask);
router.put("/updateTask/:id", updateTask);

module.exports = router;