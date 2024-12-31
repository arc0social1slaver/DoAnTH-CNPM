const express = require("express");
const { addUser, logInUser, getUsers, setStatusUser, removeNormUser } = require("./user.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create-user", addUser)
router.post("/log-in", logInUser)
router.get("/norm-user/:userID", getUsers)
router.put("/status/:id", setStatusUser)
router.delete("/:id", verifyAdmin, removeNormUser);

module.exports = router