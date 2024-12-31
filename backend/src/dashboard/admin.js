const express = require("express");
const user = require("../users/users.model");
const order = require("../orders/orders.model");
const product = require("../products/products.model");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

router.get("/",verifyAdmin, async (req, res) => {
    try {
        const allUser = await user.countDocuments();
        const allOrder = await order.countDocuments();
        const allProduct = await product.countDocuments();
        const countUser = await user.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    },
                    isAdmin: false,
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    }
                }
            }
        ])
        const countOrder = await order.aggregate([
            {
                $match: {
                    updatedAt: {
                        $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    },                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    }
                }
            }
        ])
        const countProduct = await product.aggregate([
            {
                $match: {
                    createdAt: {
                        $gt: new Date(Date.now() - 24 * 60 * 60 * 1000)
                    },                
                }
            },
            {
                $group: {
                    _id: null,
                    count: {
                        $sum: 1,
                    }
                }
            }
        ])
        res.status(200).send({
            message: "Fetch dashboard successfully",
            user: countUser,
            order: countOrder,
            product: countProduct,
            users: allUser,
            orders: allOrder,
            products: allProduct,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get admin dashboard");
    }
})

module.exports = router