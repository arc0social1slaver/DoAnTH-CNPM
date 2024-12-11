const express = require("express");
const { addProducts, getAllProds, getProd, updateProd, deleteProd } = require("./products.controller");
const router = express.Router();

router.post("/create-product", addProducts)
router.get("/", getAllProds)
router.get("/:id", getProd)
router.put("/edit/:id", updateProd)
router.delete("/:id", deleteProd)

module.exports = router