import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

const adminloginController = async(req, res)=>{
    console.log("REQ BODY", req.body);

    const {username, password} = req.body;
    //normalize username
    const normalizeUsername = username.toLowerCase();

    try{
        const adminlogin = await adminModel.findOne({username:normalizeUsername});
        if(!adminlogin){
            return res.status(400).json({message:"Username not found"});
        }

        const isMatch = await bcrypt.compare(password, adminlogin.password);
        if(!isMatch){
            return res.status(400).json({message:"Wrong password"})
        }

        req.session.usernameId = adminlogin._id;
        res.json({
            message:"Login successful"
        });
    }catch(err){
        res.status(500).json({message:"SERVER ERROR"})
    }
}

export default adminloginController;