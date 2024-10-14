import { Request, Response } from "express";
import User, { IUser } from "../models/user.model";

export const signup = async (req: Request, res: Response) => {
    try {
        const {
            fullName,
            email,
            password,
            contact,
            address,
            city,
            state,
            profilePic,
            role,
        } = req.body as IUser;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User already exists with this email",
            });
        }
        const newUser = await User.create({
            fullName,
            email,
            password,
            contact,
            address,
            city,
            state,
            profilePic,
            role,
        });
        if (!newUser) {
            return res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Failed to create user",
            });
        }
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User created successfully",
            data: newUser,
        });
    } catch (error: any) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body as Pick<IUser, "email" | "password">;
        const user: IUser | null = await User.findOne({ email }).select(
            "+password"
        );
        if (!user) {
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });
        }
        user.lastLogin = new Date();
        await user.save();
        const token = user.generateAccessToken();
        return res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 1000 * 60 * 60 * 24,
            })
            .status(200)
            .json({
                success: true,
                statusCode: 200,
                message: "Login successful",
                data: user,
            });
    } catch (error: any) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
