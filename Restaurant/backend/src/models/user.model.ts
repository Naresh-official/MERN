import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
    fullName: string;
    email: string;
    password: string;
    contact: Number;
    address: string;
    city: string;
    state: string;
    profilePic?: string;
    lastLogin: Date;
    role: string;
    isVerified?: boolean;
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
    verifiyCode?: string;
    verfiyCodeExpires?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        contact: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        state: {
            type: String,
            required: true,
        },
        profilePic: {
            type: String,
            default: "",
        },
        lastLogin: {
            type: Date,
        },
        role: {
            type: String,
            default: "user",
            enum: ["user", "admin"],
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        verifiyCode: {
            type: String,
        },
        verfiyCodeExpires: {
            type: Date,
        },
    },
    { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

userSchema.methods.comparePassword = async function (enteredPassword: string) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateVerifyCode = function () {
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) {
        code += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    this.verifiyCode = code;
    this.verfiyCodeExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    return code;
};

userSchema.methods.compareVerifyCode = function (enteredCode: string) {
    return enteredCode === this.verificationToken;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.JWT_SECRET_EXPIRY!,
    });
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
