import express from 'express'
import userModel from '../models/userModel.js';
const router = express.Router();
 
router.get('/' , (req ,res) => {
    res.json(userModel);
});
 
export default router 