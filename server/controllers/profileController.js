import User from '../models/user.js';
import { notFoundError, internalServerError, badRequestError } from '../utils/errors.js';
import { validationResult } from 'express-validator';


const uploadAvatar = async (req, res) => {
    try {
        const errors = validationResult(req);
        const user = await User.findById(req.user.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        if (errors.isEmpty()) {
            user.avatarPath = req.file.path;
            await user.save();
            return res.json({ message: 'Avatar uploaded successfully' });
        }
        return badRequestError(res, errors.array());
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export { uploadAvatar };