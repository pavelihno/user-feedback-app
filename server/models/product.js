import mongoose from 'mongoose';

import { reviewSchema } from './review.js';
import { userSchema } from './user.js';


export const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    productType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true
    },
    attributes: {
        type: Map,
        of: String,
        required: true
    },
    reviews: {
        type: [reviewSchema],
        default: []
    },
    submittedBy: {
        type: [userSchema],
        default: []
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Product = mongoose.model('Product', productSchema);