import dashboardModel from "../models/dashboardModel.js";

const pdController = async(req, res)=>{
    try{
        await dashboardModel.findByIdAndDelete(req.params.id);
        res.json("Deleted Successful");
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default pdController;