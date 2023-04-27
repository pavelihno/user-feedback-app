import { mongoose } from 'mongoose';

import { reviewSchema } from './review.js';


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
        of: [mongoose.Types.Mixed],
        required: true
    },
    reviews: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Review',
        default: []
    },
    submittedBy: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'User',
        default: []
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
});

export const Product = mongoose.model('Product', productSchema);