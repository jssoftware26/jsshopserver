import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true
    },
    orderid:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        required:true
    },
    phonenumber:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    items:[
        {
            productcode:String,
            productname:String,
            price:Number,
            qty:Number,
            file:String
        }
    ],

    producttotal:Number,
    deliverytotal:Number,
    grandtotal:Number,

    status:{
        type:String,
        default:"Pending"
    }
}, {timestamps:true});

const orderModel = mongoose.model("orders", orderSchema);
export default orderModel;