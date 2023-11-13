import express from 'express';
import {addMovie, getMovies} from '../controllers/movieController.js'
import { verifyUser } from '../middleware/authMiddleware.js';

const movieRouter = express.Router();

movieRouter.get('/' ,getMovies);
movieRouter.post('/add' ,verifyUser, addMovie);

export default movieRouter;