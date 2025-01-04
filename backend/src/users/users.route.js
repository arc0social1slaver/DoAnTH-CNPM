const express = require("express");
const { addUser, logInUser, getUsers, setStatusUser, removeNormUser, searchUserByName, getUserProfile, editUserProfile } = require("./user.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create-user", addUser)
router.post("/log-in", logInUser)
router.get("/norm-user/:userID", getUsers)
router.put("/status/:id", setStatusUser)
router.get("/profile/:id", getUserProfile)
router.post("/profile/edit/:id", editUserProfile);
router.get("/search/:userID/:name", verifyAdmin, searchUserByName);
router.delete("/:id", verifyAdmin, removeNormUser);

module.exports = router