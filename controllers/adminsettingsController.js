import adminModel from "../models/adminModel.js";
import bcrypt from "bcrypt";

const adminsettingsController = async(req, res)=>{
    console.log("REQ BODY", req.body);

    const {username, password} = req.body;
    //normalize username
    const normalizeUsername = username.toLowerCase();    

    try{
        //Check User exists
        const adminaccExist = await adminModel.findOne({username:normalizeUsername});
        if(adminaccExist){
            return res.status(400).json({message:"User already exists."});
        }
        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //Save to DB
        const newAdminaccount = new adminModel({
            username: normalizeUsername,
            password: hashedPassword
        });
        await newAdminaccount.save();
        res.status(201).json({message:"Admin Account registered successfully"});
    }catch(err){
        res.status(500).json({message:"SERVER ERROR"})
    }
}

export default adminsettingsController;