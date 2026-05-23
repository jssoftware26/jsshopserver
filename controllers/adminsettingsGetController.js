import adminModel from "../models/adminModel.js";

const adminsettingsGetController = async(req, res)=>{
    try{
        const settingGet = await adminModel.find();
        res.status(200).json(settingGet);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default adminsettingsGetController;