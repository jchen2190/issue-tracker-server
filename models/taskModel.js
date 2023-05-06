const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
    {
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
            required: true
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
            required: true
        },
        dueDate: {
            type: Date,
        }
    }
)

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;