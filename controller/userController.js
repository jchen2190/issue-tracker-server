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

        const existingUser = await User.findOne({ username: req.body.username });
        if(existingUser) {
            return res.json({ error: "Username Taken" });
        }

        await User.create(newUserObj);
        res.json({ message: "User created successfully" });

    } catch (error) {
        let errorObj = {
            message: "createUser failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function logInUser(req, res) {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            throw "User not found, you can create an account using this name."
        } else {
            let comparedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!comparedPassword) {
                throw "Please check your password and try again"
            } else {
                req.session.isAuth = true;

                let userObj = {
                    username: user.username,
                    id: user._id
                }

                req.session.user = userObj;
            }
        }
        
    } catch (error) {
        let errorObj = {
            message: "logInUser failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    createUser,
    logInUser
}