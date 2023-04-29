import { Review } from "../models/review.js";
import { Product } from "../models/product.js";
import { internalServerError, notFoundError, accessDeniedError } from '../utils/errors.js';


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
        const reviews = await Review.find();
        return res.status(200).json(reviews);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
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
        for (let file of req.files) {
            review.attachments.push(file.path)
        }
        await review.save();
        return res.status(200).json({ message: 'Attachments uploaded successfully' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};