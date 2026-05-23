import dashboardModel from "../models/dashboardModel.js";

const puController = async(req, res)=>{
    try{
        const id = req.params.id;
        //1. Get old data
        const oldData = await dashboardModel.findById(id);

        //2. Decide old data
        const fileName = req.file ? req.file.filename : oldData.file;

        //3. Update Data
        await dashboardModel.findByIdAndUpdate(
            id,
            {
                productcode: req.body.productcode,
                productname: req.body.productname,
                category: req.body.category,
                price: req.body.price,
                brand: req.body.brand || oldData.brand,
                color: req.body.color || oldData.color,
                delifee: req.body.delifee || oldData.delifee,
                cashondeli: req.body.cashondeli || oldData.cashondeli,
                warranty: req.body.warranty || oldData.warranty,
                description: req.body.description || oldData.description,
                file: fileName
            },
            {returnDocument: true}
        );
        res.json("Updated Successfully");
    }catch(err){
        res.status(500).json({message: err.message});
    }
}

export default puController;