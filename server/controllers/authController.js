import { signJWT } from '../utils/jwt.js';
import { authError, internalServerError } from '../utils/errors.js';
import { User } from '../models/user.js';
import { createUser } from './userController.js';


export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return authError(res, 'Invalid email or password');
        }
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return authError(res, 'Invalid email or password');
        }
        const token = signJWT(user._id);
        return res.status(200).json({ token });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};