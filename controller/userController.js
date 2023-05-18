const User = require("../models/userModel");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
    try {
        const existingUser = await User.findOne({ username: req.body.username });

        if (existingUser) {
            return res.json({ error: "Username Taken" });
        }

        let { username, password } = req.body;
        let salt = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(password, salt);

        let newUserObj = {
            username: username,
            password: encryptedPassword,
            assignedTo: []
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
                        payload: userObj,
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

async function userData(req, res) {
    try {
        if (!req.session || !req.session.user) {
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

async function logOutUser(req, res) {
    try {
        req.session.destroy();
        // res.clearCookie('auth');
        res.clearCookie("connect.sid", {
            maxAge: null
        })
        res.json({
            message: "User logged out"
        })
    } catch (error) {
        let errorObj = {
            message: "logOutUser failure",
            payload: error
        }
        console.log(errorObj);
        res.json(errorObj);
    }
}

async function getAllUsers(req, res) {
    try {
        let result = await User.find({})

        res.json({
            message: "success",
            payload: result
        });
    } catch (error) {
        let errorObj = {
            message: "getAllUsers failure",
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
    logOutUser,
    getAllUsers
}