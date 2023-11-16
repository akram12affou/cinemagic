import userModel from '../models/userModel.js';
import bcrypt from 'bcrypt';
import { responce } from '../utils/errorResponce.js';
import asyncHandler from "express-async-handler";
import generateToken from '../utils/generateToken.js';

export const  register = asyncHandler( async (req ,res) => {
    const {username , password , email} = req.body;
    const passwordhashed = await bcrypt.hash(password ,10);
    const user = await userModel.findOne({ $or: [{ username }, { email }] });
    if(user){  
     responce(res,'user already exist' ,400);
    }else{
     const newUser = await userModel.create({username , password :passwordhashed, email});
     newUser.save();
     const token = await generateToken(res,newUser._id);
     res.json({newUser , token});
    };
})

export const login = asyncHandler(async (req,res) => {
    const {email , password} = req.body;
    const user = await userModel.findOne({email});
    if(user){
        const matchedPassword = await bcrypt.compare(password,user.password);
        if(matchedPassword){
            const token = await generateToken(res,user._id);
            res.json({user , token});
        }else{
            responce(res,'wrong credentials',403);
        }
    }else{
      responce(res,'user don t exist',400)
    }
})