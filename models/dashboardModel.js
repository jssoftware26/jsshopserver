import mongoose from "mongoose";

const dashboardSchema = new mongoose.Schema({
    productcode:{
        type:String,
        required:true
    },
    productname:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    brand:{
        type:String
    },
    color:{
        type:String
    },
    delifee:{
        type:Number
    },
    cashondeli:{
        type:String,
        required:true
    },
    warranty:{
        type:String
    },
    description:{
        type:String
    },
    file:{
        type:String
    }    
},{
    timestamps:true
});

const dashboardModel = mongoose.model("productdata", dashboardSchema);
export default dashboardModel;