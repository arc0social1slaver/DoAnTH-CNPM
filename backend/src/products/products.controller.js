const { uploadOneFileAction, deleteAction } = require("../middleware/fileHandle");
const product = require("./products.model");
const mongoose = require("mongoose");
const addProducts = async (req, res) => {
    try {
        await uploadOneFileAction(req, res);
        if(!req.file) {
            res.status(400).send("Image is required")
        }
        else {
            const bufferProduct = JSON.parse(req.body.product)
            bufferProduct.image = req.file.filename;
            const newProduct = await product(bufferProduct);
            await newProduct.save();
            res.status(200).send({'message': 'Add product successfully', product: newProduct})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to add the product'})
    }
}
const getAllProds = async (req, res) => {
    try {
        const allProduct = await product.find().populate('cat_id',['name', 'createdAt']).sort({createdAt: -1})
        res.status(200).send({'message': 'Fetch product successfully', products: allProduct})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the product'})
    }
}
const getSugProds = async (req, res) => {
    const {userID} = req.params
    const useObjectID = new mongoose.Types.ObjectId(userID);
    try {
        const allProduct = await product.aggregate([
            {
                $match: {
                    user_id: {
                        $ne: useObjectID,
                    }
                }
            },
            {
                $sample: {
                    size: 4,
                }
            },
            {
                $lookup: {
                    from: 'categories',
                    localField: 'cat_id',
                    foreignField: '_id',
                    as: 'category',
                }
            },
            {
                $project: {
                    cat_id: 0,
                }
            },
        ])
        res.status(200).send({'message': 'Fetch product successfully', products: allProduct})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the product'})
    }
}
const getProd = async (req, res) => {
    try {
        const {id} = req.params
        const prod = await product.findById(id).populate('cat_id', 'name').populate('user_id', ['name', 'avatar', 'updatedAt', 'username', 'isActive'])
        if(!prod) {
            res.status(404).send({'message': 'Product not found'})
        }
        res.status(200).send({product: prod})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the product'})
    }
}
const getAllProdByCat = async (req, res) => {
    try {
        const {id} = req.params;
        const prod = await product.find({
            cat_id: id
        }).populate('cat_id', 'name')
        if(!prod) {
            res.status(400).send({'message': 'Product not found'})
        }
        else {
            res.status(200).send({product: prod})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the product'})   
    }
}
const getMyStore = async (req, res) => {
    const {userID} = req.params
    try {
        const prod = await product.find({
            user_id: userID
        }, {
            cat_id: 1,
            name: 1,
            price: 1,
            description: 1,
            stock: 1,
            image: 1,
        })
        if(!prod) {
            res.status(400).send({'message': 'Product not found'})
        }
        else {
            res.status(200).send({products: prod})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the product'})   
    }
}
const updateProd = async (req, res) => {
    const {id} = req.params
    try {
        await uploadOneFileAction(req, res);
        const bufferProduct = JSON.parse(req.body.product)
        if(req.file) {
            await deleteAction(`./public/${bufferProduct?.image}`)
            bufferProduct.image = req.file.filename;
        }
        const prod = await product.findByIdAndUpdate(id, bufferProduct, {new: true})
        if(!prod) {
            res.status(404).send({'message': 'Product not found'})
        }
        else {
            res.status(200).send({product: prod})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to update the product'})
    }
}
const deleteProd = async (req, res) => {
    try {
        const {id} = req.params
        const prod = await product.findByIdAndDelete(id)
        if(!prod) {
            res.status(404).send({'message': 'Product not found'})
        }
        else {
            await deleteAction(`./public/${prod.image}`)
            res.status(200).send({product: prod})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to delete the product'})
    }
}
const searchProdByName = async (req, res) => {
    const {name} = req.params;
    try {
            const allProductSort = await product.find({
                name: new RegExp('.*' + name + '.*')
            }).populate('cat_id',['name', 'createdAt']).sort({createdAt: -1})
            res.status(200).send({'message': 'Fetch product successfully', products: allProductSort})
    } catch (error) {
        console.log(error)
        res.status(500).send({'message': 'Fail to get product'});
    }
}
module.exports = {
    addProducts,
    getAllProds,
    getAllProdByCat,
    getProd,
    updateProd,
    deleteProd,
    searchProdByName,
    getMyStore,
    getSugProds,
}