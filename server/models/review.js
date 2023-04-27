import mongoose from 'mongoose';

import { commentSchema } from './comment.js';


export const reviewSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: {
        type: [commentSchema],
        default: [],
    },
}, { timestamps: true });

export const Review = mongoose.model('Review', reviewSchema);