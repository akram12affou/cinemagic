import express from 'express';
import dotenv from 'dotenv';
import { connect } from './config/db.js';
import router from './routes/userRoutes.js';
import cors from 'cors'
import { notFound,errorHandler } from './middleware/errorMiddleware.js';

const PORT = process.env.PORT || 8888;
const app = express();
app.use(cors())
app.use(express.json())
dotenv.config();
app.use('/auth' ,router)
connect(); 

app.listen(PORT , (req,res) => {
    console.log('hey from ' , PORT); 
});

app.use(notFound);
app.use(errorHandler);