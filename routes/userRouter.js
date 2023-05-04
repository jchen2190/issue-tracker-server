const express = require('express');
const router = express.Router();

const {
    createUser,
    logInUser,
    userData
} = require("../controller/userController");

// localhost:3030/api/user...
router.post("/createUser", createUser);
router.post("/logInUser", logInUser);
router.post("/userData", userData);

module.exports = router;