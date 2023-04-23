import { body } from 'express-validator';


const registerValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters long'),
    body('role')
        .optional()
        .isIn(['user', 'admin'])
        .withMessage('Role must be either "user" or "admin"'),
];

const uploadAvatarValidator = [
    body('avatar')
        .custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Avatar image is required');
            }
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const fileExtension = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error(`Avatar image must be one of the following file types: ${allowedExtensions.join(', ')}`);
            }

            return true;
        }),
];

export { registerValidator, uploadAvatarValidator };