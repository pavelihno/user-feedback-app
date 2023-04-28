import { Comment } from '../models/comment.js';
import { Review } from '../models/review.js';


export const createComment = async (req, res) => {
    try {
        const comment = new Comment(req.body);
        comment.createdBy = req.user.id;
        const review = await Review.findById(req.params.reviewId);
        review.comments.push(comment);
        await Promise.all([review.save(), comment.save()]);

        return res.status(201).json(comment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const updateComment = async (req, res) => {
    try {
        const _id = req.params.commentId;
        const updatedComment = await Comment.findOneAndUpdate({ _id }, req.body, { new: true });
        if (!updatedComment) {
            return notFoundError(res, 'Comment not found');
        }
        return res.status(200).json(updatedComment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        if (!comment) {
            return notFoundError(res, 'Comment not found');
        }
        const review = await Review.findByIdAndUpdate(comment.review, {
            $pull: { comments: comment._id },
        });

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
        const comment = await Comment.findById(req.params.commentId);
        if (!comment) {
            return notFoundError(res, 'Comment not found');
        }
        return res.status(200).json(comment);
    } catch (error) {
        return internalServerError(res, error.message);
    }
};

