const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    try {
        let { username, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, salt);

        let newUserObj = {
            username: username,
            password: encryptedPassword,
            assignedTo: []
        }

        await User.create(newUserObj);

    } catch (error) {
        let errorObj = {
            message: "createUser failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    createUser
}