import mongoose, { Document, ObjectId } from "mongoose";

export interface IMessage extends Document {
    sender: ObjectId;
    receiver: ObjectId;
    message: string;
    createdAt: Date;
}

const messageSchema = new mongoose.Schema<IMessage>({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Message = mongoose.model<IMessage>("Message", messageSchema);
export default Message;
