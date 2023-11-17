import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'
import { responce } from '../utils/errorResponce.js';
import asyncHandler from "express-async-handler";  

export const verifyUser = asyncHandler(async (req,res,next) =>{
    const token = req.headers.token
    if(token){ 
       const verifyToken = await jwt.verify(token , process.env.JWT_SECRET);
       req.user = await userModel.findById(verifyToken.id);
       next();
    }else{ 
       responce(res,"you'r not authorized",403)   
    }
});
