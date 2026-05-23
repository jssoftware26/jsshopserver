import dashboardModel from "../models/dashboardModel.js";

const homeController = async(req, res)=>{
    try{
        const productGetData = await dashboardModel.find();
        res.json(productGetData);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default homeController;