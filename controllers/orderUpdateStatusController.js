import orderModel from "../models/orderModel.js";

const orderUpdateStatusController = async(req, res)=>{
    try{
        const updateStatusOrder = await orderModel.findByIdAndUpdate(
            req.params.id,
            {
                status:req.body.status
            },
            {
                returnDocument:"after"
            }
        );

        res.json(updateStatusOrder);

    }catch(err){
        console.log(err);
        res.status(500).json({message:"Error updating order"})
    }
}

export default orderUpdateStatusController;