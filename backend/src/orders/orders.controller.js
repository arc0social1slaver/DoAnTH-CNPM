const order = require("./orders.model");
const product = require("../products/products.model");
const mongoose = require("mongoose");
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
                    // mssv: "$user-data._id",
                    tenkhachhang: "$user-data.name",
                    phone: "$user-data.phone",
                    createdAt: 1,
                    status: 1,
                    price: "$product-data.price",
                    // product_id: "$product-data._id",
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
const getPurchaseHistory = async (req, res) => {
    const {userID} = req.params;
    const useObjectID = new mongoose.Types.ObjectId(userID);
    try {
        const orderList = await order.aggregate([
            {
                $match: {
                    userID: useObjectID
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'prodIDs',
                    foreignField: "_id",
                    as: "product-data"
                }
            },
            {
                $unwind: "$product-data"
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    status: 1,
                    price: "$product-data.price",
                    product_name: "$product-data.name",
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            }
        ])
        res.status(200).send({message: "Get orders successfully", orders: orderList})
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get orders");
    }
}
const getPurchaseHistoryByStatus = async (req, res) => {
    const {userID, stat} = req.params;
    
    const useObjectID = new mongoose.Types.ObjectId(userID);
    try {
        const orderList = await order.aggregate([
            {
                $match: {
                    userID: useObjectID,
                    status: stat,
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'prodIDs',
                    foreignField: "_id",
                    as: "product-data"
                }
            },
            {
                $unwind: "$product-data"
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    status: 1,
                    price: "$product-data.price",
                    product_name: "$product-data.name",
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            }
        ])
        res.status(200).send({message: "Get orders successfully", orders: orderList})
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get orders");
    }
}
const getMyOrders = async (req, res) => {
    const {userID} = req.params;
    const useObjectID = new mongoose.Types.ObjectId(userID);
    try {
        const orderList = await order.aggregate([
            {
                $lookup: {
                    from: 'products',
                    localField: 'prodIDs',
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                user_id: useObjectID,
                            }
                        }
                    ],
                    as: "product-data"
                }
            },
            {
                $addFields: {
                    "countProduct": {
                        $size: "$product-data.name"
                    }
                }
            },
            {
                $match: {
                    countProduct: {
                        $ne: 0
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    status: 1,
                    products: "$product-data.name",
                    price: {
                        $sum: "$product-data.price",
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            }
        ])
        res.status(200).send({message: "Get orders successfully", myOrders: orderList})
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get orders");   
    }
}
const getMyOrdersByStatus = async (req, res) => {
    const {userID, stat} = req.params;
    const useObjectID = new mongoose.Types.ObjectId(userID);
    try {
        const orderList = await order.aggregate([
            {
                $match: {
                    status: stat,
                }
            },
            {
                $lookup: {
                    from: 'products',
                    localField: 'prodIDs',
                    foreignField: "_id",
                    pipeline: [
                        {
                            $match: {
                                user_id: useObjectID,
                            }
                        }
                    ],
                    as: "product-data"
                }
            },
            {
                $addFields: {
                    "countProduct": {
                        $size: "$product-data.name"
                    }
                }
            },
            {
                $match: {
                    countProduct: {
                        $ne: 0
                    }
                }
            },
            {
                $project: {
                    _id: 1,
                    createdAt: 1,
                    status: 1,
                    products: "$product-data.name",
                    price: {
                        $sum: "$product-data.price",
                    }
                }
            },
            {
                $sort: {
                    createdAt: -1,
                }
            }
        ])
        res.status(200).send({message: "Get orders successfully", myOrders: orderList})
    } catch (error) {
        console.log(error);
        res.status(500).send("Fail to get orders");   
    }
}
const editOrder = async (req, res) => {
    const {orderID} = req.params
    try {
        const updatedOrders = await order.findByIdAndUpdate(orderID, req.body, {new: true});
        if(!updatedOrders) {
            res.status(404).send({'message': 'Order not found'})
        }
        else {
            res.status(200).send({order: updatedOrders});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({'message': 'Fail to update the orders'})
    }
}
module.exports = {
    addOrder,
    getAllOrders,
    getPurchaseHistory,
    getPurchaseHistoryByStatus,
    getMyOrders,
    getMyOrdersByStatus,
    editOrder,
}