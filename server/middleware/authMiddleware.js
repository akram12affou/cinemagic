import jwt from 'jsonwebtoken';
import { responce } from '../utils/errorResponce.js';
import asyncHandler from "express-async-handler";

export const verifyUser = asyncHandler(async (req,res,next) =>{
    const token = req.headers.token
    res.json(token)
    // if(token){
    //    const verifyToken = await verify(token , process.env.JWT_SECRET);
    //    res.json(verifyToken);
    // }else{
    // //    responce(res,"you'r not authorized",403)  
    //    res.json('hegy');
    // }
});
