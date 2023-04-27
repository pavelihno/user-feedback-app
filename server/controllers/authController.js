import { validationResult } from 'express-validator';

import { signJWT } from '../utils/jwt.js';
import { authError, internalServerError, badRequestError } from '../utils/errors.js';
import { User } from '../models/user.js';


const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestError(res, errors.array());
        }
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return authError(res, 'Invalid email or password');
        }
        user = new User(req.body);
        await user.save();
        const token = signJWT(user._id);
        return res.status(200).json({ token });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

const login = async (req, res) => {
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

export { register, login };