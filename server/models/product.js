import mongoose from 'mongoose';

import { reviewSchema } from './review.js';
import { userSchema } from './user.js';


const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
        required: true,
    },
    reviews: {
        type: [reviewSchema],
        default: [],
    },
    submittedBy: {
        type: [userSchema],
        default: []
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Product = mongoose.model('Product', productSchema);

export { Product, productSchema };