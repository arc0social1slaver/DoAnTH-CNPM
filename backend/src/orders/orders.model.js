const mongoose = require("mongoose")

const ordersSchema = new mongoose.Schema({
    address : {
        city: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true,
        },
        street: {
            type: String,
            required: true,
        }
    },
    prodIDs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "products",
            required: true,
        }
    ],
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        default: "Pending",
    },
    phone: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
})
const orders = mongoose.model('orders', ordersSchema);
module.exports = orders;