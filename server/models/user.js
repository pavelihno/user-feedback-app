import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const userRoles = ['user', 'admin'];

export const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: userRoles,
        default: 'user',
        required: true
    },
    avatarPath: {
        type: String,
        default: null
    }
}, { timestamps: true });

userSchema.statics.getUserRoles = () => { return userRoles };

userSchema.methods.setPassword = async function (password) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        this.password = hashedPassword;
    } catch (error) {
        throw Error(error.message);
    }
};

userSchema.methods.isPasswordCorrect = async function (candidatePassword) {
    try {
        const isPasswordCorrect = await bcrypt.compare(candidatePassword, this.password);
        return isPasswordCorrect;
    } catch (error) {
        return false;
    }
};

export const User = mongoose.model('User', userSchema);