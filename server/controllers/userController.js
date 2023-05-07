import { User } from '../models/user.js';
import { notFoundError, internalServerError, accessDeniedError, authError } from '../utils/errors.js';
import { deleteFile } from '../utils/fileStorage.js';
import { signJWT } from '../utils/jwt.js';


const isInvalidAccess = (req, modifiedUser) => {
    const user = req.user;
    return (user._id.toString() !== modifiedUser._id.toString() && user.role !== 'admin');
};

export const createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return authError(res, 'Invalid email or password');
        }
        user = new User({ email, name });
        await user.setPassword(password)
        await user.save();
        const token = signJWT(user._id, user.password);
        return res.status(200).json({ user, token });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        if (isInvalidAccess(req, user)) {
            return accessDeniedError(res, 'Access denied');
        }
        return res.status(200).json(user);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateUser = async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        user.name = name;
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        if (isInvalidAccess(req, user)) {
            return accessDeniedError(res, 'Access denied');
        }
        await user.deleteOne();
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const changePassword = async (req, res) => {
    try {
        const { password } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        await user.setPassword(password);
        await user.save();
        return res.status(200).json(user);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const uploadAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const avatarPath = req.file.path;
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        if (user.avatarPath) {
            deleteFile(user.avatarPath);
        }
        user.avatarPath = avatarPath;
        await user.save();
        return res.status(200).json({ message: 'Avatar uploaded successfully', avatarPath });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};