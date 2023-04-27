import { body, param, validationResult } from 'express-validator';
import { Types } from 'mongoose';

import { Attribute } from '../models/attribute.js';
import { User } from '../models/user.js';
import { notFoundError, badRequestError } from './errors.js';


export const validateRequest = (validators) => {
    return async (req, res, next) => {
        await Promise.all(validators.map((validator) => validator.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            next();
        } else {
            return badRequestError(res, errors.array());
        }
    };
}

export const registerValidator = [
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
        .isIn(User.getUserRoles())
        .withMessage('Role does not exist')
];

export const loginValidator = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Invalid email address')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
];

export const uploadAvatarValidator = [
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

export const createProductTypeValidator = [
    body('name')
        .notEmpty()
        .withMessage('Product type name is required'),
    body('attributes')
        .isArray({ min: 1 })
        .withMessage('At least one attribute is required')
        .custom((attributes) => {
            for (let i = 0; i < attributes.length; i++) {
                if (!attributes[i].name) {
                    throw new Error('Attribute name is required');
                }
                if (!attributes[i].type) {
                    throw new Error('Attribute type is required');
                }
                if (!Attribute.getAttributeTypes().includes(attributes[i].type)) {
                    throw new Error(`Invalid attribute type: ${attributes[i].type}`);
                }
            }
            return true;
        })
];

export const updateProductTypeValidator = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Product type name is required'),
    body('attributes')
        .optional()
        .isArray({ min: 1 })
        .withMessage('At least one attribute is required')
        .custom((attributes) => {
            for (let i = 0; i < attributes.length; i++) {
                if (!attributes[i].name) {
                    throw new Error('Attribute name is required');
                }
                if (!attributes[i].type) {
                    throw new Error('Attribute type is required');
                }
                if (!Attribute.getAttributeTypes().includes(attributes[i].type)) {
                    throw new Error(`Invalid attribute type: ${attributes[i].type}`);
                }
            }
            return true;
        })
];

export const createProductValidator = [];

export const objectIdValidator = [
    param('id')
        .custom((value) => {
            if (!Types.ObjectId.isValid(value)) {
                throw new Error('Invalid ID');
            }
            return true;
        })
];
