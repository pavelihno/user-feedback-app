import User from '../models/user.js';
import { notFoundError, internalServerError } from '../utils/errors.js';


const uploadAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        // TODO: validation if file is missing
        // remove previous avatar 
        user.avatarPath = req.file.path;
        await user.save();
        res.json({ message: 'Avatar uploaded successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export { uploadAvatar };