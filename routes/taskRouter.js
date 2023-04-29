const express = require('express');
const router = express.Router();

const {
    getTaskList,
} = require("../controller/taskController");

// localhost:3030/api...
router.get("/tasklist", getTaskList);

module.exports = router;