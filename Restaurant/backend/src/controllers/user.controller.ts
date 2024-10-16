import { Request, Response } from "express";
import User, { IUser } from "../models/user.model.js";
import sendVerificationEmail from "../utils/resend/verificationEmail.js";

export const signup = async (req: Request, res: Response): Promise<void> => {
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
        const existingUser: IUser | null = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                success: false,
                statusCode: 400,
                message: "User already exists with this email",
            });
            return;
        }
        const newUser: IUser | null = await User.create({
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
            res.status(500).json({
                success: false,
                statusCode: 500,
                message: "Failed to create user",
            });
            return;
        }
        const code = newUser.generateVerifyCode();
        // TODO: send verification email
        // const mailRes = await sendVerificationEmail(email, code);
        // if (!mailRes) {
        //     res.status(500).json({
        //         success: false,
        //         statusCode: 500,
        //         message: "Failed to send verification email",
        //     });
        //     return;
        // }
        await newUser.save();
        const displayUser: Partial<typeof newUser> = newUser.toObject();
        delete displayUser.password;
        delete displayUser.__v;
        delete displayUser.verifyCode;
        delete displayUser.verifyCodeExpires;
        res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User created successfully",
            data: displayUser,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body as Pick<
            IUser,
            "email" | "password"
        >;
        const user: IUser | null = await User.findOne({ email }).select(
            "+password"
        );
        if (!user) {
            res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
            return;
        }
        if (!user.isVerified) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Please verify your email",
            });
            return;
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });
            return;
        }
        user.lastLogin = new Date();
        await user.save();
        const token = user.generateAccessToken();
        const displayUser: Partial<typeof user> = user.toObject();
        delete displayUser.password;
        delete displayUser.__v;
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
        })
            .status(200)
            .json({
                success: true,
                statusCode: 200,
                message: "Login successful",
                data: displayUser,
            });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
    try {
        res.clearCookie("token").status(200).json({
            success: true,
            statusCode: 200,
            message: "Logout successful",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};

export const verifyEmail = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { code, email } = req.query as { code: string; email: string };
    const user: IUser | null = await User.findOne({ email }).select(
        "+verifyCode"
    );
    if (!user) {
        res.status(404).json({
            success: false,
            statusCode: 404,
            message: "User not found",
        });
        return;
    }
    if (
        !user.isVerified &&
        user.verifyCodeExpires &&
        user.verifyCodeExpires?.getTime() < Date.now()
    ) {
        await user.deleteOne();
        res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Verification code expired, User deleted",
        });
        return;
    }
    if (user.verifyCode !== code) {
        res.status(401).json({
            success: false,
            statusCode: 401,
            message: "Invalid verification code",
        });
        return;
    }
    user.isVerified = true;
    await user.save();
    res.status(200).json({
        success: true,
        statusCode: 200,
        message: "Email verified successfully",
    });
};

export const deleteAccount = async (req: Request, res: Response) => {
    try {
        const { user } = req;
        if (!user) {
            res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Unauthorized",
            });
            return;
        }
        await user.deleteOne();
        res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Account deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            statusCode: 500,
            message: error.message,
        });
    }
};
