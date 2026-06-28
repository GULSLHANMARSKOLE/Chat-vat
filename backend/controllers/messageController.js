const Message = require("../models/Message");
const Chat = require("../models/Chat");

const sendMessage = async (req, res) => {
    try {
        const { chatId, text } = req.body;

        if (!chatId || !text) {
            return res.status(400).json({
                message: "chatId and text are required",
            });
        }
        const message = await Message.create({
            sender: req.user._id,
            chat: chatId,
            text,
        });
        await Chat.findByIdAndUpdate(chatId, {
            lastMessage: text,
            updatedAt: Date.now(),
        });

        return res.status(201).json(message);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

const getMessages = async (req, res) => {
    try {
        const { chatId } = req.params;

        if (!chatId) {
            return res.status(400).json({
                message: "chatId is required",
            });
        }

        const messages = await Message.find({
            chat: chatId,
        })
        .populate("sender", "name email")
        .sort({ createdAt: 1 });

        return res.status(200).json(messages);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
module.exports = {
    sendMessage,
    getMessages,
};