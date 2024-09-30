import Follow from "../models/follow.model.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Like from "../models/like.model.js";
import Comment from "../models/comment.model.js";
import uploadToCloudinary, {
    deleteFileFromCloudinary,
} from "../utils/uploadToCloudinary.js";
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
            message: "User created successfully",
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
                message: "Logged in successfully",
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
            message: "User fetched successfully",
            data: { user: responseUser },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const editUser = async (req, res) => {
    try {
        const { username, email, firstName, lastName, bio, gender } = req.body;
        const profileImg = req?.file;
        const user = req.user;
        if (username) {
            const existingUserByUsername = await User.findOne({ username });
            if (existingUserByUsername)
                return res.status(409).json({
                    success: false,
                    statusCode: 409,
                    message: "User with this username already exists",
                });
            user.username = username || user.username;
        }
        if (email) {
            const existingUserByEmail = await User.findOne({ email });
            if (existingUserByEmail)
                return res.status(409).json({
                    success: false,
                    statusCode: 409,
                    message: "User with this email already exists",
                });
            user.email = email || user.email;
        }

        user.firstName =
            firstName?.trim().length > 0 ? firstName : user.firstName;
        user.lastName = lastName?.trim().length > 0 ? lastName : user.lastName;
        user.bio = bio?.trim().length > 0 ? bio : user.bio;
        user.gender = gender?.trim().length > 0 ? gender : user.gender;

        if (profileImg) {
            const buffer = Buffer.from(profileImg.buffer);
            const url = await uploadToCloudinary(buffer);
            await deleteFileFromCloudinary(user.profileImg);
            user.profileImg = url;
        }

        await user.save();
        const responseUser = user.toObject();
        delete responseUser.password;
        delete responseUser.__v;

        return res.status(201).json({
            success: true,
            statusCode: 201,
            message: "User updated successfully",
            data: { user: responseUser },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password)
            return res.status(400).json({
                success: false,
                statusCode: 400,
                message: "Password is required",
            });
        const userId = req.user._id;
        const user = await User.findById(userId).select("+password");
        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: "Invalid credentials",
            });

        // deleting all posts of the user
        const posts = await Post.find({ owner: userId });
        posts.forEach(async (post) => {
            await deleteFileFromCloudinary(post.image);
            await post.deleteOne();
        });

        // deleting all comments of the user and user posts
        const comments = await Comment.find({
            $or: [{ commentedBy: userId }, { post: { $in: posts } }],
        });
        comments.forEach(async (comment) => {
            await comment.deleteOne();
        });

        // deleting all follow of the user
        const follows = await Follow.find({
            $or: [{ followedBy: userId }, { followedTo: userId }],
        });
        follows.forEach(async (follow) => {
            await follow.deleteOne();
        });

        // deleting all likes of the user
        const likes = await Like.find({
            $or: [{ user: userId }, { post: { $in: posts } }],
        });
        likes.forEach(async (like) => {
            await like.deleteOne();
        });

        // TODO: delete conversations and messages of the user
        // TODO: delete notifications of the user

        await user.deleteOne();
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "User deleted successfully",
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};

export const getSuggestedUsers = async (req, res) => {
    // TODO: test this in postman
    try {
        const users = await User.aggregate([
            {
                $lookup: {
                    from: "follows",
                    localField: "_id",
                    foreignField: "following",
                    as: "isFollowedByCurrentUser",
                },
            },
            {
                $match: {
                    _id: { $ne: new mongoose.Types.ObjectId(req.user._id) },
                    "isFollowedByCurrentUser.followedBy": {
                        $ne: new mongoose.Types.ObjectId(req.user._id),
                    },
                },
            },
            { $sample: { size: 6 } },
            {
                $project: {
                    _id: 1,
                    username: 1,
                    firstName: 1,
                    lastName: 1,
                    profileImg: 1,
                    isFollowedByCurrentUser: 1,
                },
            },
        ]);
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Suggested users fetched successfully",
            data: { users },
        });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, statusCode: 500, message: error.message });
    }
};
