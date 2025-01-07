const mongoose = require("mongoose");

const messSchema = new mongoose.Schema({
    chatID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat-rooms',
        required: true,
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    content: String
}, {
    timestamps: true
});
const messages = mongoose.model('messages', messSchema);
module.exports = messages;