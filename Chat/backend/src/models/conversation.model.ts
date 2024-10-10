import mongoose, { Document, ObjectId } from "mongoose";

export interface IConversation extends Document {
    members: ObjectId[];
    messages: ObjectId[];
    createdAt: Date;
}

const conversationSchema = new mongoose.Schema<IConversation>({
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Conversation = mongoose.model<IConversation>(
    "Conversation",
    conversationSchema
);
export default Conversation;
