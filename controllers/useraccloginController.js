import useraccModel from "../models/useraccModel.js";
import bcrypt from "bcrypt";

const useraccloginController = async(req, res)=>{
    try{
        const {email, password} = req.body;
        //Check User Exist
        const useraccExist = await useraccModel.findOne({email});
        if(!useraccExist){
            return res.status(400).json({message: "User not found"});
        }

        const match = await bcrypt.compare(password, useraccExist.password);
        if(!match){
            return res.status(400).json({message: "Wrong password"});
        }

        // SAVE SESSION
        req.session.save((err)=>{
            if(err){
                return res.status(500).json({
                    message: err.message
                });
            }

            res.json({
                message: "Login success",
                useraccExist:{    //Save Login User's Data for Order Form
                    _id: useraccExist._id,
                    username: useraccExist.username,
                    phonenumber: useraccExist.phonenumber,
                    address: useraccExist.address
                }
            });
        })
        
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default useraccloginController;