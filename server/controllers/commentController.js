import { Comment } from '../models/comment.js';
import { Review } from '../models/review.js';
import { notFoundError, internalServerError, accessDeniedError } from '../utils/errors.js';


const isInvalidAccess = (req, comment) => {
    const user = req.user;
    return (user._id.toString() !== comment.createdBy.toString() && user.role !== 'admin');
};

export const createComment = async (req, res) => {
    try {
        const { text, review: reviewId } = req.body;
        const comment = new Comment({ text, review: reviewId });
        comment.createdBy = req.user.id;
        const review = await Review.findById(reviewId);
        review.comments.push(comment);
        await Promise.all([review.save(), comment.save()]);

        return res.status(201).json(comment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateComment = async (req, res) => {
    try {
        const { text } = req.body;
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return notFoundError(res, 'Comment not found');
        }
        if (isInvalidAccess(req, comment)) {
            return accessDeniedError(res, 'Access denied');
        }
        comment.text = text;
        await comment.save();
        return res.status(200).json(comment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return notFoundError(res, 'Comment not found');
        }
        if (isInvalidAccess(req, comment)) {
            return accessDeniedError(res, 'Access denied');
        }
        const review = await Review.findByIdAndUpdate(comment.review, {
            $pull: { comments: comment._id },
        });
        await comment.deleteOne();
        return res.status(200).json({ message: 'Comment deleted' });
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        return res.status(200).json(comments);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const getComment = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('createdBy');
        if (!comment) {
            return notFoundError(res, 'Comment not found');
        }
        return res.status(200).json(comment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

