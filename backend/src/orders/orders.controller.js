const order = require("./orders.model");
const product = require("../products/products.model");
const addOrder = async (req, res) => {
    try {
        const {prodIDs} = req.body;
        const newProd = await product.updateMany(
            {
                _id: {
                    $in: prodIDs
                }
            },
            {
                $inc: {
                    stock: -1
                }
            }
        )
        const newOrder = new order({...req.body});
        await newOrder.save();
        res.status(200).send({
            message: 'Add order successfully',
            order: newOrder,
            product: newProd,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}
const getAllOrders = async (req, res) => {
    try {
        const orderList = await order.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'prodIDs',
                    foreignField: "_id",
                    as: "product-data"
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userID',
                    foreignField: "_id",
                    as: "user-data"
                }
            },
            {
                $unwind: "$user-data"
            },
            {
                $unwind: "$product-data"
            },
            {
                $project: {
                    _id: 1,
                    mssv: "$user-data._id",
                    tenkhachhang: "$user-data.username",
                    createdAt: 1,
                    status: 1,
                    phone: 1,
                    price: "$product-data.price",
                    product_id: "$product-data._id",
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            }
            
        ])
        res.status(200).send({message: "Get orders successfully", rows: orderList})
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get orders");
    }
}
module.exports = {
    addOrder,
    getAllOrders,
}