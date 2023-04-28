const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
    {
        IssueNo: {
            type: Number,
            unique: true,
            required: true
        },
        Description: {
            type: String,
            unique: true,
            required: true
        },
        Importance: {
            type: String,
            required: true
        },
    }
)

const Issue = mongoose.model("Issue", issueSchema);
module.exports = Issue;