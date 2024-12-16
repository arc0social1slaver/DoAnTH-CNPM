const category = require("./categories.model");
const addCat = async (req, res) => {
    const {name} = req.body;
    try {
        const tempCate = await category.findOne({name})
        if(tempCate) {
            return res.status(400).send({message: 'Duplicate category'});
        }
        const newCategory = await category({...req.body})
        await newCategory.save();
        res.status(200).send({'message': 'Add category successfully', cat: newCategory})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to add the category'})
    }
}
const getAllCats = async (req, res) => {
    try {
        const allCategory = await category.find().sort({createdAt: -1})
        res.status(200).send({'message': 'Fetch category successfully', cats: allCategory})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to fetch the category'})
    }
}
const updateCat = async (req, res) => {
    try {
        const {id} = req.params
        const newCat = await category.findByIdAndUpdate(id, req.body, {new: true})
        if(!newCat) {
            return res.status(404).send({'message': 'Category not found'})
        }
        res.status(200).send({cat: newCat})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to update the category'})
    }
}
const deleteCat = async (req, res) => {
    try {
        const {id} = req.params
        const oldCat = await category.findByIdAndDelete(id)
        if(!oldCat) {
            return res.status(404).send({'message': 'Category not found'})
        }
        res.status(200).send({cat: oldCat})
    } catch (error) {
        console.error(error);
        res.status(500).send({'message': 'Fail to delete the category'})
    }
}
module.exports = {
    addCat,
    getAllCats,
    updateCat,
    deleteCat,
}