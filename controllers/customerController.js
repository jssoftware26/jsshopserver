import useraccModel from "../models/useraccModel.js";

const customerController = async(req, res)=>{
    try{
        const customer = await useraccModel.find();
        res.status(200).json(customer);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default customerController;