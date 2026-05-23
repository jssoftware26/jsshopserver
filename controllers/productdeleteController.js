import dashboardModel from "../models/dashboardModel.js";
import supabase from "../config/supabase.js";

const pdController = async(req, res)=>{
    try{
        const id = req.params.id;
        //Find product first
        const product = await dashboardModel.findById(id);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            });
        }

        //Delete image from Supabase
        if(product.file){
            
            console.log("FULL URL:", product.file);
            const fileName = product.file.split("/").pop();
            console.log("FILE NAME:", fileName);

            const {err} = await supabase.storage
                .from("productimages")
                .remove([fileName]);

            if(err){
                console.log(err)
            }
        }

        //Delete product from MongoDB
        await dashboardModel.findByIdAndDelete(id);
        res.json("Deleted Successful");
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

export default pdController;