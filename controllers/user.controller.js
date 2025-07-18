import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const users = await User.findById(req.params.id).select("-password"); 
        if (!users) {
            const error = new Error("User not found!");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        next(error);
    }
}