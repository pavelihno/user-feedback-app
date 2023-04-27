import express from 'express';
import mongoose from 'mongoose';

import { register, login } from './controllers/authController.js';
import { uploadAvatar } from './controllers/userController.js';
import { createProductType, updateProductType, deleteProductType, getProductType, getProductTypes } from './controllers/productTypeController.js';
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts } from './controllers/productController.js';
import { validateRequest, registerValidator, loginValidator, objectIdValidator, uploadAvatarValidator, createProductTypeValidator, updateProductTypeValidator, createProductValidator, updateProductValidator } from './utils/validators.js';
import { requireAvatar } from './utils/middlewares/uploadMiddleware.js';
import { requireAdmin, requireAuth } from './utils/middlewares/authMiddleware.js';


const connectDB = async () => {
    const MONGO_URI = `mongodb://${process.env.MONGODB_ROOT_USER}:${process.env.MONGODB_ROOT_USER_PASSWORD}@mongo:${process.env.MONGODB_DOCKER_PORT}/${process.env.MONGODB_DATABASE}`;

    await mongoose
        .connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("Successfully connected to DB"))
        .catch((e) => {
            console.log(`Error while connecting to DB: ${e.message}`);
        });
};

const app = express();

app.use(express.json())

connectDB();

app.get('/', requireAuth, (req, res) => {
    res.send('Home Route');
});


// auth
app.post('/register', validateRequest(registerValidator), register);
app.post('/login', validateRequest(loginValidator), login);

// user
app.post('/upload', requireAuth, requireAvatar, validateRequest(uploadAvatarValidator), uploadAvatar);


// productType
app.post('/productTypes', requireAdmin, validateRequest(createProductTypeValidator), createProductType);
app.put('/productTypes/:id', requireAdmin, validateRequest(objectIdValidator, updateProductTypeValidator), updateProductType);
app.delete('/productTypes/:id', requireAdmin, validateRequest(objectIdValidator), deleteProductType);
app.get('/productTypes', requireAuth, getProductTypes);
app.get('/productTypes/:id', requireAuth, validateRequest(objectIdValidator), getProductType);

// product
app.post('/products', requireAuth, validateRequest(createProductValidator), createProduct);
app.put('/products/:id', requireAuth, validateRequest(objectIdValidator, updateProductValidator), updateProduct);
app.delete('/products/:id', requireAuth, validateRequest(objectIdValidator), deleteProduct);
app.get('/products', getProducts);
app.get('/products/:id', validateRequest(objectIdValidator), getProduct);



export default app;