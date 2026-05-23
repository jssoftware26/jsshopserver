import orderModel from "../models/orderModel.js";

const orderController = async(req, res)=>{
    try{
        //Find latest order
        const latestOrder = await orderModel.findOne()
            .sort({createdAt:-1});

        //Default first order id
        let orderid = "ORD-10001";

        //If orders exist
        if(latestOrder && latestOrder.orderid){
            const latestNumber = Number(
                latestOrder.orderid.split("-")[1]) || 10000;

                orderid = `ORD-${latestNumber + 1}`;
        }

        //Create new Order
        const newOrder = new orderModel({
            orderid:orderid,

            userid:req.body.userid,
            username:req.body.username,
            phonenumber:req.body.phonenumber,
            address:req.body.address,

            items:req.body.items,

            producttotal:req.body.producttotal,
            deliverytotal:req.body.deliverytotal,
            grandtotal:req.body.grandtotal,

            status:"Pending"

        });
        await newOrder.save();

        res.status(201).json({message:"Order placed successfully", order:newOrder});
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default orderController;