const express = require("express");
const { createRoom, findChatRoom, findChat } = require("./chat-room.controller");
const router = express.Router();

router.post("/create-room", createRoom);
router.get("/:userId", findChatRoom);
router.get("/find/:firstID/:secondID", findChat);

module.exports = router