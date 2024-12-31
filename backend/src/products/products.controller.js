const product = require("./products.model");
const addProducts = async (req, res) => {
    try {
        const newProduct = await product({...req.body})
        await newProduct.save();
        res.status(200).send({'message': 'Add product successfully', product: newProduct})
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
const getProd = async (req, res) => {
    try {
        const {id} = req.params
        const prod = await product.findById(id).populate('cat_id', 'name')
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
const updateProd = async (req, res) => {
    try {
        const {id} = req.params
        const prod = await product.findByIdAndUpdate(id, req.body, {new: true})
        if(!prod) {
            res.status(404).send({'message': 'Product not found'})
        }
        res.status(200).send({product: prod})
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
        res.status(200).send({product: prod})
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
}