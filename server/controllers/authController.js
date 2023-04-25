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
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return authError(res, 'Invalid email or password');
        }
        user = new User({ name, email, password });
        await user.save();
        const token = signJWT(user._id);
        res.json({ token });
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
        res.json({ token });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export { register, login };