const rooms = require("./chat-room.model");

const createRoom = async (req, res) => {
    const {firstID, secondID} = req.body;
    try {
        const room = await rooms.findOne({
            members: {
                $all : [firstID, secondID]
            }
        })
        if(room) {
            res.status(200).send({message: "Chat room already exist", chat_room: room})
        }
        else {
            const newRoom = new rooms({
                members: [firstID, secondID]
            })
            await newRoom.save();
            res.status(200).send({message: "Chat room created successfully", chat_room: newRoom});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Fail to create chat room"});
    }
}
const findChatRoom = async (req, res) => {
    const {userId} = req.params;
    try {
        const room = await rooms.find({
            members: {
                $in: [userId]
            }
        }).populate('members', 'username');
        res.status(200).send({chat_room: room});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Fail to find chat rooms"});
    }
}
const findChat = async (req, res) => {
    const {firstID, secondID} = req.params;
    try {
        const room = await rooms.find({
            members: {
                $in: [firstID, secondID]
            }
        }).populate('members', 'username');
        res.status(200).send({chat_room: room});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Fail to find chat"});
    }
}
module.exports = {
    createRoom,
    findChatRoom,
    findChat,
}