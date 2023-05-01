import { mongoose } from 'mongoose';

import { User } from './user.js';


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
    approvedBy: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            unique: true
        }],
        default: []
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
});

productSchema.methods.approve = async function (user) {
    try {
        const userId = user._id;
        if (this.approvedBy.includes(userId) || this.isApproved) {
            return false;
        }
        this.approvedBy.push(userId);
        const isAdmin = user.role === 'admin';
        if (isAdmin) {
            this.isApproved = true;
            await this.save();
            return true;
        }
        const nonAdminApprovals = await User.countDocuments({ _id: { $in: this.approvedBy }, role: { $ne: 'admin' } });
        if (nonAdminApprovals >= 3) {
            this.isApproved = true;
            await this.save();
            return true;
        }
        await this.save();
        return false;
    } catch (error) {
        return false;
    }
};

export const Product = mongoose.model('Product', productSchema);