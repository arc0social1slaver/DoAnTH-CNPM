const express = require("express");
const { addUser, logInUser, getUsers } = require("./user.controller");
const router = express.Router();

router.post("/create-user", addUser)
router.post("/log-in", logInUser)
router.get("/norm-user/:userID", getUsers)

module.exports = router