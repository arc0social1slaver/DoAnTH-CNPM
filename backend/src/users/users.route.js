const express = require("express");
const { addUser, logInUser } = require("./user.controller");
const router = express.Router();

router.post("/create-user", addUser)
router.post("/log-in", logInUser)

module.exports = router