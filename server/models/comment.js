import mongoose from 'mongoose';


const commentSchema = new mongoose.Schema({
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

const Comment = mongoose.model('Comment', commentSchema);

export { Comment, commentSchema };