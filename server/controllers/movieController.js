import movieModel from "../models/movieModel.js" 

export const getMovies = async  (req, res) => {
    const movies = await movieModel.find({userId:req.user._id})
    res.json(movies);
};

export const addMovie = async (req, res) => {
    try {
      const {id,title,poster_path,vote_average} = req.body;
      const newMovie = await movieModel.create({
      title,poster_path,vote_average,id,userId:req.user._id
    });
    newMovie.save();
    res.json(newMovie);  
    } catch (error) {
         res.json(error);
    }
};

export const removeMovie = async (req,res) => {
    const {id} = req.params;
    await movieModel.findOneAndDelete({id ,  userId : req.user._id});
     
}