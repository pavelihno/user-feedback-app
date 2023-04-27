import mongoose from 'mongoose';

import { attributeSchema } from './attribute.js';


export const productTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    attributes: {
        type: [attributeSchema],
        required: true,
    },
});

export const ProductType = mongoose.model('ProductType', productTypeSchema);