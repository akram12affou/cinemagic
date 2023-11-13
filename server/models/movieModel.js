import { Schema , model,Types } from "mongoose";

const movieSchema = Schema({
    id:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    poster_path:{
        type:String,
        required:true
    },
    vote_average:{
        type:String,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        required:true
    }
});

const movieModel = model("movie" , movieSchema);

export default movieModel;