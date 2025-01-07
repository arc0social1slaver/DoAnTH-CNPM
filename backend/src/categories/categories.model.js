const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
},  {
    timestamps: true
});
const category = mongoose.model('categories', categorySchema);
module.exports = category;