import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

import { Attribute } from '../models/attribute.js';
import { User } from '../models/user.js';
import { ProductType } from '../models/productType.js';
import { Review } from '../models/review.js';
import { badRequestError } from './errors.js';
import { Product } from '../models/product.js';
import { getAllowedExtensions } from './fileStorage.js';


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

const validateObjectId = (value) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid ID');
    }
    return true;
};

export const objectIdValidator = [
    param('id')
        .custom(validateObjectId)
];

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
            const allowedExtensions = getAllowedExtensions();
            const fileExtension = req.file.originalname.slice(req.file.originalname.lastIndexOf('.')).toLowerCase();
            if (!allowedExtensions.includes(fileExtension)) {
                throw new Error(`Avatar image must be one of the following file types: ${allowedExtensions.join(', ')}`);
            }
            return true;
        }),
];

const validateProductTypeAttributes = (attributes) => {
    for (let i = 0; i < attributes.length; i++) {
        if (!attributes[i].name) {
            throw new Error('Attribute name is required');
        }
        if (!attributes[i].type) {
            throw new Error('Attribute type is required');
        }
        if (!attributes[i].key) {
            throw new Error('Attribute key is required');
        }
        if (!Attribute.getAttributeTypes().includes(attributes[i].type)) {
            throw new Error(`Invalid attribute type: ${attributes[i].type}`);
        }
    }
    return true;
};

export const createProductTypeValidator = [
    body('name')
        .notEmpty()
        .withMessage('Product type name is required'),
    body('attributes')
        .isArray({ min: 1 })
        .withMessage('At least one attribute is required')
        .custom(validateProductTypeAttributes)
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
        .custom(validateProductTypeAttributes)
];

const validateProductAttributes = async (attributes, { req }) => {
    if (!req.body.productType) {
        if (Object.keys(attributes).length > 0) {
            throw new Error('Attributes should be empty when product type is not provided');
        }
        return true;
    }
    if (!req.body.attributes) {

    }
    const productType = await ProductType.findById(req.body.productType).lean();
    if (!productType) {
        throw new Error('Invalid product type');
    }
    const allowedAttributes = productType.attributes.map((attr) => attr.key);
    const receivedAttributes = Object.keys(attributes);
    const isValid = receivedAttributes.every((attr) => allowedAttributes.includes(attr));
    if (!isValid) {
        throw new Error('Invalid attributes product type');
    }
    for (const [attr, value] of Object.entries(attributes)) {
        const attributeType = productType.attributes.find((a) => a.key === attr)?.type;
        if (!attributeType) {
            throw new Error(`Invalid attribute type for ${attr}`);
        }
        const allowedTypes = Attribute.getAttributeTypes();
        if (!allowedTypes.includes(attributeType)) {
            throw new Error(`Invalid attribute type for ${attr}`);
        }
        if (attributeType === 'enum') {
            const options = productType.attributes.find((a) => a.key === attr)?.options;
            if (!options || !options.includes(value)) {
                throw new Error(`Invalid value for ${attr}`);
            }
        } else if (attributeType === 'list') {
            if (!Array.isArray(value)) {
                throw new Error(`Invalid value for ${attr}`);
            }
        } else if (attributeType === 'text') {
            if (typeof value !== 'string') {
                throw new Error(`Attribute "${attr}" must be of type "text"`);
            }
        } else if (attributeType === 'integer') {
            if (!Number.isInteger(value)) {
                throw new Error(`Attribute "${attr}" must be of type "integer"`);
            }
        } else if (attributeType === 'float') {
            if (typeof value !== 'number' || Number.isNaN(value)) {
                throw new Error(`Attribute "${attr}" must be of type "float"`);
            }
        } else if (attributeType === 'location') {
            if (!value || typeof value.lat !== 'number' || typeof value.long !== 'number') {
                throw new Error(`Attribute "${attr}" must be of type "location"`);
            }
        } else if (attributeType === 'boolean') {
            if (typeof value !== 'boolean') {
                throw new Error(`Attribute "${attr}" must be of type "boolean"`);
            }
        } else if (attributeType === 'date') {
            if (isNaN(Date.parse(value))) {
                throw new Error(`Attribute "${attr}" must be of type "date"`);
            }
        }
    }
    return true;
};

const validateProductProductType = async (productTypeId) => {
    const productType = await ProductType.findById(productTypeId).lean();
    if (!productType) {
        throw new Error('Invalid product type');
    }
    return true;
};

export const createProductValidator = [
    body('name')
        .notEmpty()
        .withMessage('Product name is required'),
    body('productType')
        .notEmpty()
        .withMessage('Product type is required')
        .custom(validateProductProductType),
    body('attributes')
        .notEmpty()
        .optional()
        .custom(validateProductAttributes)
];

export const updateProductValidator = [
    body('name')
        .optional()
        .notEmpty()
        .withMessage('Product name is required'),
    body('productType')
        .optional()
        .notEmpty()
        .withMessage('Product type is required')
        .custom(validateProductProductType),
    body('attributes')
        .optional()
        .custom(validateProductAttributes)
];

export const createReviewValidator = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Text is required'),
    body('product')
        .trim()
        .notEmpty()
        .withMessage('Product is required')
        .custom(async (productId) => {
            validateObjectId(productId);
            const product = await Product.findById(productId).lean();
            if (!product) {
                throw new Error('Product not found');
            }
            return true;
        })
];

export const updateReviewValidator = [
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Title is required'),
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Text is required')
];

export const uploadAttachmentsValidator = [
    body('attachments.*')
        .custom((value, { req }) => {
            if (!req.files) {
                throw new Error('At least one attachment is required');
            }
            const allowedExtensions = getAllowedExtensions();
            const attachments = Array.isArray(req.files['attachments']) ? req.files['attachments'] : [req.files['attachments']];

            for (let attachment of attachments) {
                const fileExtension = attachment.originalname.slice(attachment.originalname.lastIndexOf('.')).toLowerCase();
                if (!allowedExtensions.includes(fileExtension)) {
                    throw new Error(`Attachments must be one of the following file types: ${allowedExtensions.join(', ')}`);
                }
            }
            return true;
        })
];

export const createCommentValidator = [
    body('text')
        .trim()
        .notEmpty()
        .withMessage('Text is required'),
    body('review')
        .trim()
        .notEmpty()
        .withMessage('Review is required')
        .custom(async (reviewId) => {
            validateObjectId(reviewId);
            const product = await Review.findById(reviewId).lean();
            if (!product) {
                throw new Error('Review not found');
            }
            return true;
        }),
    body('review')
        .trim()
        .notEmpty()
        .withMessage('Review is required')
];

export const updateCommentValidator = [
    body('text')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Text is required'),
    body('review')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Review is required')
];