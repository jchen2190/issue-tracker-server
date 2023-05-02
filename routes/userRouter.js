const express = require('express');
const router = express.Router();

const {
    createUser,
} = require("../controller/userController");

// localhost:3030/api/user...
router.post("/createUser", createUser);

module.exports = router;