import { Review } from "../models/review.js";
import { Product } from "../models/product.js";
import { internalServerError, notFoundError, accessDeniedError } from '../utils/errors.js';
import { deleteFile } from "../utils/fileStorage.js";
import { User } from "../models/user.js";


const isInvalidAccess = (req, review) => {
    const user = req.user;
    return (user._id.toString() !== review.createdBy.toString() && user.role !== 'admin');
};

export const createReview = async (req, res) => {
    try {
        const { title, text, rating, product: productId } = req.body;
        const review = new Review({ title, text, rating, product: productId });
        review.createdBy = req.user.id;
        const product = await Product.findById(productId);
        product.reviews.push(review);
        await Promise.all([product.save(), review.save()]);

        return res.status(201).json(review);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateReview = async (req, res) => {
    try {
        const { title, text, rating } = req.body;
        const review = await Review.findById(req.params.id);
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        if (isInvalidAccess(req, review)) {
            return accessDeniedError(res, 'Access denied');
        }
        Object.assign(review, { title, text, rating });
        await review.save();
        return res.status(200).json(review);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        if (isInvalidAccess(req, review)) {
            return accessDeniedError(res, 'Access denied');
        }
        const product = await Product.findByIdAndUpdate(review.product, {
            $pull: { reviews: review._id },
        });
        await review.deleteOne();
        return res.status(200).json({ message: 'Review deleted' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        return res.status(200).json(reviews);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getUserReviews = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return notFoundError(res, 'User not found');
        }
        const reviews = await Review.find({ createdBy: user._id }).sort({ createdAt: -1 });
        return res.status(200).json(reviews);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getProductReviews = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return notFoundError(res, 'Product not found');
        }
        const reviews = await Review.find({ product: product._id }).sort({ createdAt: -1 });
        return res.status(200).json(reviews);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id)
            .populate('createdBy')
            .populate({
                path: 'product',
                populate: {
                    path: 'productType',
                    model: 'ProductType'
                }
            });
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        return res.status(200).json(review);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const uploadReviewAttachments = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        if (isInvalidAccess(req, review)) {
            return accessDeniedError(res, 'Access denied');
        }
        for (let file of req.files) {
            review.attachments.push(file.path)
        }
        await review.save();
        return res.status(200).json({ message: 'Attachments uploaded successfully', attachments: review.attachments });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteReviewAttachments = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        if (isInvalidAccess(req, review)) {
            return accessDeniedError(res, 'Access denied');
        }
        for (let path of req.body.attachments) {
            review.attachments = review.attachments.filter(attachmentPath => attachmentPath !== path);
            deleteFile(path);
        }
        review.save();
        return res.status(200).json({ message: 'Attachments deleted successfully', attachments: review.attachments });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};