import useraccModel from "../models/useraccModel.js";
import bcrypt from "bcrypt";

const useraccSignUpController = async(req, res)=>{
    try{
        const {username, email, password, phonenumber, address} = req.body;
        //Check User Exist
        const useraccExist = await useraccModel.findOne({email});
        if(useraccExist){
            return res.status(200).json({message:"User already exists"});
        }

        //Create New User (New Signup)
        const hash = await bcrypt.hash(password, 10);
        const useraccCreate = await useraccModel.create({
            username, email, password: hash, phonenumber, address
        });
        res.json({
            message: "Signup success", useraccCreate
        })
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default useraccSignUpController;