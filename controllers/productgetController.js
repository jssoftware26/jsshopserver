import dashboardModel from "../models/dashboardModel.js";

const pgController = async(req, res)=>{
    try{
        const getData = await dashboardModel.find();
        res.status(200).json(getData);
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default pgController;