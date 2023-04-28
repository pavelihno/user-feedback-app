import mongoose from 'mongoose';


const minRating = 1;
const maxRating = 5;

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
        min: minRating,
        max: maxRating,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Comment',
        default: [],
    },
    attachments: {
        type: [String],
        default: []
    }
}, { timestamps: true });

reviewSchema.statics.getMinRating = () => { return minRating };
reviewSchema.statics.getMaxRating = () => { return maxRating };

export const Review = mongoose.model('Review', reviewSchema);