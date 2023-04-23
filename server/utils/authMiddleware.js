import { authError, accessDeniedError, internalServerError } from '../utils/errors.js';
import { verifyJWT } from './jwt.js';
import User from '../models/user.js';


const requireAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyJWT(token);
        const user = await User.findById(decodedToken.userId);
        if (!user) {
            return authError(res, 'Invalid token');
        }
        req.user = user;
        next();
    } catch (error) {
        return authError(res, 'Invalid token');
    }
};

const requireAdmin = async (req, res, next) => {
    try {
        if (req.user.role !== 'admin') {
            return accessDeniedError(res, 'Access denied');
        }
        next();
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export { requireAdmin, requireAuth };