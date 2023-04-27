import jwt from 'jsonwebtoken';


export const signJWT = (userId) => {
    const token = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_PERIOD });
    return token;
}

export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}