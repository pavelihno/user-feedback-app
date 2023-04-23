import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import { validationResult } from 'express-validator';

import { signJWT } from '../utils/jwt.js';
import { authError, internalServerError, badRequestError } from '../utils/errors.js';


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
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return authError(res, 'Invalid email or password');
        }
        const token = signJwt(user._id);
        res.json({ token });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export { register, login };