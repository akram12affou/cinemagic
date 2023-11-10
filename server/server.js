import express from 'express';
import dotenv from 'dotenv';
import { connect } from './config/db.js';
import router from './routes/userRoutes.js';
const PORT = process.env.PORT || 8888;
const app = express();

dotenv.config();
connect();

app.use('/user' ,router);

app.listen(PORT , (req,res) => {
    console.log('hey from ' , PORT);
});