import dashboardModel from "../models/dashboardModel.js";
import supabase from "../config/supabase.js";

const puController = async(req, res)=>{
    try{
        const id = req.params.id;
        //1. Get old data
        const oldData = await dashboardModel.findById(id);

        if(!oldData){
            return res.status(404).json({
                message:"Product not found"
            });
        }
        let imageUrl = oldData.file;

        //If new image uploaded
        if(req.file){
            //Delete old image from Supabase
            if(oldData.file){
                const oldFileName = oldData.file.split("/").pop();
                await supabase.storage
                    .from("productimages")
                    .remove([oldFileName]);
            }
            //Upload new image
            const fileName = `${Date.now()}-${req.file.originalname.replace(/\s+/g, "-")}`;

            const {data, err} = await supabase.storage
                    .from("productimages")
                    .upload(fileName, req.file.buffer, {
                        contentType:req.file.mimetype
                    });
            if(err){
                console.log(err);
                return res.status(500).json({
                    message:err.message
                });
            }
            //Get Public URL
            const {data:publicUrlData} = supabase.storage
                    .from("productimages")
                    .getPublicUrl(fileName);
            imageUrl = publicUrlData.publicUrl;
        
        }

        //Update Product
        const updateProduct = await dashboardModel.findByIdAndUpdate(
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
                file: imageUrl
            },
            {returnDocument: true}
        );

        res.status(200).json({
            message: "Updated Successfully",
            updateProduct
        });
    }catch(err){
        console.log(err);
        
        res.status(500).json({message: err.message});
    }
}

export default puController;