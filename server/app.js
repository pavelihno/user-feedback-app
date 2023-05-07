import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { login, auth } from './controllers/authController.js';
import { changePassword, createUser, deleteUser, getUser, getUsers, updateUser, uploadAvatar } from './controllers/userController.js';
import { createProductType, updateProductType, deleteProductType, getProductType, getProductTypes } from './controllers/productTypeController.js';
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, approveProduct } from './controllers/productController.js';
import { createReview, updateReview, deleteReview, getReview, getReviews, uploadReviewAttachments, deleteReviewAttachments } from './controllers/reviewController.js';
import { createComment, updateComment, deleteComment, getComment, getComments } from './controllers/commentController.js';
import {
    validateRequest, createUserValidator, loginValidator, objectIdValidator,
    uploadAvatarValidator,
    createProductTypeValidator, updateProductTypeValidator,
    createProductValidator, updateProductValidator,
    createReviewValidator, updateReviewValidator,
    createCommentValidator, updateCommentValidator, uploadAttachmentsValidator, updateUserValidator, changePasswordValidator
} from './utils/validators.js';
import { requireAvatar, requireAttachments } from './utils/middlewares/uploadMiddleware.js';
import { requireAdmin, requireAuth } from './utils/middlewares/authMiddleware.js';


const connectDB = async () => {
    const MONGO_URI = `mongodb://${process.env.MONGODB_ROOT_USER}:${process.env.MONGODB_ROOT_USER_PASSWORD}@mongo:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}`;

    await mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Successfully connected to DB"))
        .catch(e => {
            console.log(`Error while connecting to DB: ${e.message}`);
        });
};

const app = express();

app.use(express.json());
app.use(cors());
app.use('/storage', express.static('storage'));

connectDB();

app.get('/', requireAuth, (req, res) => {
    res.send('Home Route');
});


// auth
app.post('/register', validateRequest(createUserValidator), createUser);
app.post('/login', validateRequest(loginValidator), login);
app.get('/auth', requireAuth, auth);

// user
app.post('/users', requireAdmin, validateRequest(createUserValidator), createUser);
app.put('/users', requireAuth, validateRequest(updateUserValidator), updateUser);
app.delete('/users/:id', requireAuth, validateRequest(objectIdValidator), deleteUser);
app.get('/users', requireAdmin, getUsers);
app.get('/users/:id', requireAuth, validateRequest(objectIdValidator), getUser);
app.put('/users/changePassword', requireAuth, validateRequest(changePasswordValidator), changePassword);
app.post('/users/uploadAvatar', requireAuth, requireAvatar, validateRequest(uploadAvatarValidator), uploadAvatar);

// productType
app.post('/productTypes', requireAdmin, validateRequest(createProductTypeValidator), createProductType);
app.put('/productTypes/:id', requireAdmin, validateRequest(objectIdValidator, updateProductTypeValidator), updateProductType);
app.delete('/productTypes/:id', requireAdmin, validateRequest(objectIdValidator), deleteProductType);
app.get('/productTypes', getProductTypes);
app.get('/productTypes/:id', validateRequest(objectIdValidator), getProductType);

// product
app.post('/products', requireAuth, validateRequest(createProductValidator), createProduct);
app.put('/products/:id', requireAuth, validateRequest(objectIdValidator, updateProductValidator), updateProduct);
app.delete('/products/:id', requireAuth, validateRequest(objectIdValidator), deleteProduct);
app.get('/products', getProducts);
app.get('/products/:id', validateRequest(objectIdValidator), getProduct);
app.post('/products/:id/approve', requireAuth, validateRequest(objectIdValidator), approveProduct);

// review
app.post('/reviews', requireAuth, validateRequest(createReviewValidator), createReview);
app.put('/reviews/:id', requireAuth, validateRequest(objectIdValidator, updateReviewValidator), updateReview);
app.delete('/reviews/:id', requireAuth, validateRequest(objectIdValidator), deleteReview);
app.get('/reviews', getReviews);
app.get('/reviews/:id', validateRequest(objectIdValidator), getReview);
app.post('/reviews/:id/attachments', requireAuth, requireAttachments, validateRequest(objectIdValidator, uploadAttachmentsValidator), uploadReviewAttachments);
app.delete('/reviews/:id/attachments', requireAuth, validateRequest(objectIdValidator), deleteReviewAttachments);

// comment
app.post('/comments', requireAuth, validateRequest(createCommentValidator), createComment);
app.put('/comments/:id', requireAuth, validateRequest(objectIdValidator, updateCommentValidator), updateComment);
app.delete('/comments/:id', requireAuth, validateRequest(objectIdValidator), deleteComment);
app.get('/comments', getComments);
app.get('/comments/:id', validateRequest(objectIdValidator), getComment);


export default app;