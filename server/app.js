import express from 'express';
import mongoose from 'mongoose';

import { register, login } from './controllers/authController.js';
import { uploadAvatar } from './controllers/profileController.js';
import { registerValidator, uploadAvatarValidator } from './utils/validators.js';
import { requireAvatar } from './utils/middlewares/uploadMiddleware.js';
import { requireAuth } from './utils/middlewares/authMiddleware.js';


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

app.post('/register', registerValidator, register);

app.post('/login', login);

app.post('/upload', requireAuth, requireAvatar, uploadAvatarValidator, uploadAvatar);



export default app;