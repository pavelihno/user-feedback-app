import mongoose from 'mongoose';

import { attributeSchema } from './attribute.js';


const productTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    attributes: {
        type: [attributeSchema],
        required: true,
    },
});

const ProductType = mongoose.model('ProductType', productTypeSchema);

export { ProductType, productTypeSchema };