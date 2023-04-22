import express from 'express';
import mongoose from 'mongoose';


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

connectDB();

app.get('/', (req, res) => {
  res.send('Home Route');
});



export default app;