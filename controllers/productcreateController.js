import dashboardModel from "../models/dashboardModel.js";
import supabase from "../config/supabase.js";

const pcController = async(req, res)=>{
    try{
        console.log("REQ:", req.body);
        console.log("FILE:", req.file);

        let imageUrl = "";
        //Upload image to Supabase
        if(req.file){
            const fileName = `${Date.now()}-${req.file.originalname}`;

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
        
        //Find latest product code
        const latestProductCode = await dashboardModel.findOne()
            .sort({createdAt:-1});

        //Default first prodcut code
        let productcode = "JS-0000001";

        //If product code already exist
        if(latestProductCode && latestProductCode.productcode){
            const latestNumber = parseInt(
                latestProductCode.productcode.split("-")[1]
            );

            const newNumber = latestNumber + 1;
            
            productcode = `JS-${String(newNumber).padStart(7, "0")}`;
        }

        //Create Products
        const newProductCreate = new dashboardModel({

            productcode: productcode,

            productname: req.body.productname,
            category: req.body.category,
            price: req.body.price,
            brand: req.body.brand,
            color: req.body.color,
            delifee: req.body.delifee,
            cashondeli: req.body.cashondeli,
            warranty: req.body.warranty,
            description: req.body.description,
            file: req.file? imageUrl : null
        });
        await newProductCreate.save();
        res.status(201).json(newProductCreate);

    }catch(err){
        res.status(500).json({message: "Product create failed"});        
    }
}

export default pcController;