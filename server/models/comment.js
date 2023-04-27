import mongoose from 'mongoose';


export const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });

export const Comment = mongoose.model('Comment', commentSchema);