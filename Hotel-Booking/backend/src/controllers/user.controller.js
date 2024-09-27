import { User } from "../models/user.model.js";

export const registerUser = async (req, res) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }
        const user = await User.create({
            email,
            firstName,
            lastName,
            password,
        });
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const responseUser = user.toObject();
        delete responseUser.password;
        delete responseUser.__v;
        const token = user.generateJwtToken();
        res.cookie("token", token).status(200).json({
            success: true,
            message: "User logged in successfully",
            data: responseUser,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token").status(200).json({
            success: true,
            message: "User logged out successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error",
        });
    }
};

export const getUser = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: req.user,
    });
};
