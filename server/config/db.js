import mongoose from "mongoose";

const connect = () => {
    mongoose.connect(process.env.MONGO_URL).then(res => {
        console.log('connected succefully')
    }).catch((err) => {
        console.log('mongoose error' , err)
    }) 
};

export {connect};
