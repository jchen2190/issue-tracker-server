const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        importance: {
            type: String,
            required: true
        },
    }
)

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;