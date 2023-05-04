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
        res.json({
            message: "User created successfully",
        });

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
            return res.json({ error: "User not found" })
        } else {
            let comparedPassword = await bcrypt.compare(
                req.body.password,
                user.password
            )

            if (!comparedPassword) {
                return res.json({ error: "Invalid Password" })
            } else {
                req.session.isAuth = true;
                
                let userObj = {
                    username: user.username,
                    id: user._id
                }
                req.session.user = userObj;

                req.session.save((error) => {
                    if (error) {
                        console.error(error);
                    }
                    res.json({
                        message: "User logged in successfully",
                        payload: req.session,
                    })
                })
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

// TO DO: Access session data after logging in, session data is missing
async function userData(req, res) {
    try {
        console.log(req.session);
        if (!req.session) {
            return res.json({ error: "Not Authorized" })
        } else {
            const username = req.session.user.username;
            const foundUser = await User.findOne({ username: username})
            res.json({
                message: "Access successful",
                payload: foundUser
            })
        }
    } catch (error) {
        let errorObj = {
            message: "userData failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

module.exports = {
    createUser,
    logInUser,
    userData,
}