import { User } from '../models/user.js';
import { notFoundError, internalServerError } from '../utils/errors.js';
import { deleteFile } from '../utils/fileStorage.js';


export const uploadAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        if (user.avatarPath) {
            deleteFile(user.avatarPath);
        }
        user.avatarPath = req.file.path;
        await user.save();
        return res.status(200).json({ message: 'Avatar uploaded successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};