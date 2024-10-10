import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    name: string;
    username: string;
    email: string;
    password: string;
    profilePic?: string;
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    profilePic: {
        type: String,
        default: function () {
            return `https://ui-avatars.com/api/?name=${this.name}&bold=true&background=random`;
        },
    },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
