const express = require('express');
const router = express.Router();

const {
    createUser,
    logInUser,
    userData,
    logOutUser,
    getAllUsers,
    addIssueToUserWatchlist,
} = require("../controller/userController");

// localhost:3030/api/user...
router.post("/createUser", createUser);
router.post("/logInUser", logInUser);
router.post("/userData", userData);
router.post("/logOutUser", logOutUser);
router.get("/getAllUsers", getAllUsers);
router.put("/addIssueToWatchlist", addIssueToUserWatchlist)

module.exports = router;