import dashboardModel from "../models/dashboardModel.js";

const plGController = async(req, res)=>{
    try{
        const plGData = await dashboardModel.find();
        res.status(200).json(plGData);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default plGController;