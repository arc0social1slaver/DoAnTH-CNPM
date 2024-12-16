const express = require("express");
const { addCat, getAllCats, updateCat, deleteCat } = require("./categories.controller");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.post("/create-category", verifyAdmin ,addCat);
router.get("/", getAllCats);
// router.get("/:id", getProd)
router.put("/edit/:id", verifyAdmin, updateCat);
router.delete("/:id", verifyAdmin, deleteCat);

module.exports = router