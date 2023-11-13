import express from 'express';
import {addMovie, getMovies, removeMovie} from '../controllers/movieController.js'
import { verifyUser } from '../middleware/authMiddleware.js';

const movieRouter = express.Router();

movieRouter.get('/' , verifyUser , getMovies);
movieRouter.post('/add' , verifyUser , addMovie);
movieRouter.delete('/remove/:id' ,verifyUser, removeMovie) 


export default movieRouter;