const express = require("express");
const { addOrder, getAllOrders } = require("./orders.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/", addOrder);
router.get("/", verifyAdmin,getAllOrders);
module.exports = router;