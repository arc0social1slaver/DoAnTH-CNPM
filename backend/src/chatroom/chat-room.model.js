const mongoose = require("mongoose")

const chatroomSchema = new mongoose.Schema({
    members: [{
        type: mongoose.Schema.ObjectId,
        ref: 'users',
    }],
}, {
    timestamps: true
})
const rooms = mongoose.model('chat-rooms', chatroomSchema);
module.exports = rooms;