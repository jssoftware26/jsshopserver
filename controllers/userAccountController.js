import useraccModel from "../models/useraccModel.js";

//Get
export const userAccountGetController = async(req, res)=>{
    try{
        const getUserAccount = await useraccModel.findById(req.params.id);
        res.status(200).json(getUserAccount);
    }catch(err){
        console.log(err);
    }
}