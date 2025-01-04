const express = require("express");
const { addOrder, getAllOrders, getPurchaseHistory, getPurchaseHistoryByStatus, getMyOrders, getMyOrdersByStatus, editOrder, } = require("./orders.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/", addOrder);
router.get("/purchase/:userID", getPurchaseHistory);
router.get("/purchase/:userID/:stat", getPurchaseHistoryByStatus);
router.get("/my-store/:userID", getMyOrders);
router.get("/my-store/:userID/:stat", getMyOrdersByStatus);
router.put("/edit/:orderID", editOrder);
router.get("/", verifyAdmin,getAllOrders);
module.exports = router;