import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const sender = req.user;
        const { message } = req.body;
        if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        let conversation = await Conversation.findOne({
            members: { $all: [sender, receiverId] },
        });
        if (!conversation) {
            conversation = new Conversation({
                members: [sender, receiverId],
            });
            await conversation.save();
        }
        const newMessage = await Message.create({
            sender: sender._id,
            receiver: receiverId,
            message,
        });
        conversation.messages.push(newMessage._id);
        await conversation.save();

        // TODO: implement socket.io
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "Message sent",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getMessages = async (req, res) => {
    try {
        const { receiverId } = req.params;
        const sender = req.user;
        if (!receiverId || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        const conversation = await Conversation.findOne({
            members: { $all: [sender._id, receiverId] },
        }).populate("messages");
        if (!conversation) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "No messages found",
                data: { messages: [] },
            });
        }

        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Messages fetched successfully",
            data: { messages: conversation.messages },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const deleteMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const user = req.user;
        if (!messageId || !mongoose.Types.ObjectId.isValid(messageId)) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Invalid id",
            });
        }
        const message = await Message.findById(messageId);
        if (!message) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "Message not found",
            });
        }
        if (message.sender.toString() !== user._id.toString()) {
            return res.status(403).json({
                success: false,
                statusCode: 403,
                message: "You are not authorized to delete this message",
            });
        }
        const conversation = await Conversation.findOne({
            members: { $all: [message.sender, message.receiver] },
        });
        await message.deleteOne();
        conversation.messages.pull(messageId);
        await conversation.save();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Message deleted successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
