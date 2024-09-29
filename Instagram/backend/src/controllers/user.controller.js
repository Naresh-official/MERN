import User from "../models/user.model.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";

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

        return res.status(201).json({ success: true, statusCode: 201, user });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
