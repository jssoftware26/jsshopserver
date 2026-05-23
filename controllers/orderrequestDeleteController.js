import orderModel from "../models/orderModel.js";

const orderrequestDeleteController = async(req, res)=>{
    try{
        await orderModel.findByIdAndDelete(req.params.id);
        res.json("Deleted Successful")
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default orderrequestDeleteController;