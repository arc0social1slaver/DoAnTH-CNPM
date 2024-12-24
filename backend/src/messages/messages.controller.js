const messages = require("./messages.model");
const chatroom = require("../chatroom/chat-room.model");

const createMessage = async (req, res) => {
    const {chatID, senderID, content} = req.body;
    try {
        const members = await chatroom.find({
            _id: chatID,
            members: {
                $in: [senderID]
            }
        })
        if(members.length) {
        const newMessage = new messages({
            chatID,
            senderID,
            content
        });
        await newMessage.save();
        res.status(200).send({message: "Create message successfully", new_mess: newMessage});
        }
        else {
            res.status(404).send({message: "Sender has not joined yet"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Fail to create message"});
    }
}
const getMessages = async (req, res) => {
    const {chatID} = req.params;
    try {
        const mess = await messages.find({chatID});
        res.status(200).send({all_mess: mess});
    } catch (error) {
        console.log(error);
        res.status(500).send({message: "Fail to get message"});
    }
}
module.exports = {
    createMessage,
    getMessages,
}