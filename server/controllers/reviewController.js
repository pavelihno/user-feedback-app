import { Review } from "../models/review.js";
import { Product } from "../models/product.js";
import { internalServerError, notFoundError } from '../utils/errors.js';


export const createReview = async (req, res) => {
    try {
        const review = new Review(req.body);
        review.createdBy = req.user.id;
        const product = await Product.findById(req.product);
        product.reviews.push(review);
        await Promise.all([product.save(), review.save()]);

        return res.status(201).json(review);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateReview = async (req, res) => {
    try {
        const _id = req.params.id;
        const updatedReview = await Review.findOneAndUpdate({ _id }, req.body, { new: true });
        if (!updatedReview) {
            return notFoundError(res, 'Review not found');
        }
        return res.status(200).json(updatedReview);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        if (!review) {
            return notFoundError(res, 'Review not found');
        }
        const product = await Product.findByIdAndUpdate(review.product, {
            $pull: { reviews: review._id },
        });

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