import { authError, accessDeniedError, internalServerError } from '../errors.js';
import { verifyJWT } from '../jwt.js';
import { User } from '../../models/user.js';


const getUser = async (req) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verifyJWT(token);
        const user = await User.findById(decodedToken.userId);
        return user;
    }  catch (error) {
        return null;
    }
};


export const requireAuth = async (req, res, next) => {
    try {
        const user = await getUser(req);
        if (!user) {
            return authError(res, 'Invalid token');
        }
        req.user = user;
        next();
    } catch (error) {
        return authError(res, 'Invalid token');
    }
};

export const requireAdmin = async (req, res, next) => {
    const user = await getUser(req);
    try {
        await requireAuth(req, res, async () => {
            if (user.role !== 'admin') {
                return accessDeniedError(res, 'Access denied');
            }
            next();
        });
    } catch (error) {
        return accessDeniedError(res, 'Access denied');
    }
};