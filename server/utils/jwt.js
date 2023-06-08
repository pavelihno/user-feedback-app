import jwt from 'jsonwebtoken';


export const signJWT = (userId, password) => {
    const token = jwt.sign({ userId, password }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION_PERIOD });
    return token;
}

export const verifyJWT = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}