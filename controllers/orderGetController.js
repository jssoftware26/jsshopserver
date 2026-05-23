import orderModel from "../models/orderModel.js";

const orderGetController = async(req, res)=>{
    try{
        const orderlist = await orderModel.find();
        res.status(200).json(orderlist);
    }catch(err){
        res.status(500).json({message:err.message})
    }
}

export default orderGetController;