import express from 'express';
import {addMovie, getMovies} from '../controllers/movieController.js'

const movieRouter = express.Router();

movieRouter.get('/' ,getMovies)
movieRouter.post('/add' , addMovie)

export default movieRouter;