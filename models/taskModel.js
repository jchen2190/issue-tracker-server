const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
        taskNo: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        },
        subject: {
            type: String,
            required: true
        },
        description: {
            type: String,
        },
        importance: {
            type: String,
            required: true
        },
        author: {
            type: String,
            required: true
        },
        assignTo: {
            type: String,
        },
        dueDate: {
            type: Date,
        }
    }
)

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;