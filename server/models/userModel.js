import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:false,
    }
});

const userModel = mongoose.model("user" , userSchema);

export default userModel;