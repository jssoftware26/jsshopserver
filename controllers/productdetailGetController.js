import dashboardModel from "../models/dashboardModel.js";

const productdetailGetController = async(req, res)=>{
    const pDetailGet = await dashboardModel.findById(
        req.params.id
    );
    res.json(pDetailGet);
}

export default productdetailGetController;