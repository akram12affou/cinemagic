import movieModel from "../models/movieModel.js" 

export const getMovies = async  (req, res) => {
    const movies = await movieModel.find()
    res.json(movies);
};

export const addMovie = async  (req, res) => {
    //userId mn lmiddleware
    try {
      const {id,title,poster_path,vote_average} = req.body;
    const newMovie = await movieModel.create({
        title,poster_path,vote_average,id
    });
    newMovie.save();
    res.json(newMovie);  
    } catch (error) {
         res.json(error);
    }
    
};