import User from "../models/user.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, firstName, lastName, bio, gender } =
            req.body;
        const profileImg = req?.file;
        if (
            !username ||
            !email ||
            !password ||
            !firstName ||
            !lastName ||
            !gender
        )
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide all fields",
            });
        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail)
            return res.status(409).json({
                success: false,
                statusCode: 409,
                message: "User with this email already exists",
            });
        const existingUserByUsername = await User.findOne({ username });
        if (existingUserByUsername)
            return res.status(409).json({
                success: false,
                statusCode: 409,
                message: "User with this username already exists",
            });

        const newUser = new User({
            username,
            email,
            password,
            firstName,
            lastName,
            gender,
            bio,
        });
        if (profileImg) {
            const buffer = Buffer.from(profileImg.buffer);
            const url = await uploadToCloudinary(buffer);
            newUser.profileImg = url;
        }

        const user = await newUser.save();

        const responseUser = user.toObject();
        delete responseUser.password;
        delete responseUser.__v;

        return res.status(201).json({
            success: true,
            statusCode: 201,
            data: { user: responseUser },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { emailOrUsername, password } = req.body;
        if (!emailOrUsername || !password)
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Please provide email and password",
            });
        const user = await User.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }],
        }).select("+password");
        if (!user)
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        const responseUser = user.toObject();
        delete responseUser.password;
        delete responseUser.__v;
        return res
            .cookie("token", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({
                success: true,
                statusCode: 200,
                data: {
                    user: responseUser,
                },
            });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
            .status(200)
            .json({ success: true, statusCode: 200, message: "Logged out" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = req.user;
        if (!user)
            return res.status(404).json({
                success: false,
                statusCode: 404,
                message: "User not found",
            });
        const responseUser = user.toObject();
        delete responseUser.password;
        delete responseUser.__v;
        return res.status(200).json({
            success: true,
            statusCode: 200,
            data: { user: responseUser },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
