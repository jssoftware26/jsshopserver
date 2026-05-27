import express from "express";
const router = express.Router();

//Import controller'packages
import adminloginController from "../controllers/adminloginController.js";
//Admin Product Create Controllers Imported Packages
import pcController from "../controllers/productcreateController.js";
import pgController from "../controllers/productgetController.js";
import pdController from "../controllers/productdeleteController.js";
import puController from "../controllers/productupdateController.js";

//Admin Product Create Controllers Imported Packages
import plGController from "../controllers/productlistGetController.js";
import adminsettingsController from "../controllers/adminsettingsController.js";
import adminsettingsGetController from "../controllers/adminsettingsGetController.js";
import orderGetController from "../controllers/orderGetController.js";

//Import Controller for Home Page
import homeController from "../controllers/homeController.js";

//Import for User Action from /pages/....
import productdetailGetController from "../controllers/productdetailGetController.js";

//Import middleware
import isAuth from "../middleware/authRoute.js";
import fileUpload from "../middleware/uploadmiddleware.js";

//Import User Account Controllers
import useraccSignUpController from "../controllers/useraccsignupController.js";
import useraccloginController from "../controllers/useraccloginController.js";
import customerController from "../controllers/customerController.js";

import {userAccountGetController} from "../controllers/userAccountController.js";

//Import Order Controller
import orderController from "../controllers/orderController.js";
import orderUpdateStatusController from "../controllers/orderUpdateStatusController.js";
import orderrequestDeleteController from "../controllers/orderrequestDeleteController.js";
//------------------------------------------------------------------------------------


router.post("/admin/adminlogin", adminloginController);
//Admin Product Create Routers
router.post("/admin/productcreate", fileUpload.single("file"), pcController);
router.get("/admin/productcreate", pgController);
router.delete("/admin/productcreate/:id", pdController);
router.put("/admin/productcreate/:id", fileUpload.single("file"), puController);
router.post("/admin/settings", adminsettingsController);
router.get("/admin/settings", adminsettingsGetController);

router.get("/dashboard", isAuth, (req, res)=>{
    res.json({
        message:"Welcome to AdminDashboard!"
    });
});

//Admin Product List Routers
router.get("/admin/productlist", plGController);
router.get("/admin/orders", orderGetController);

//Home ProductGet
router.get("/home", homeController);
router.get("/productdetail/:id", productdetailGetController);

//User Accounts Router
router.post("/auth/signup", useraccSignUpController);
router.post("/auth/login", useraccloginController);
router.get("/myaccount/:id", userAccountGetController);

router.get("/admin/customer", customerController);

router.get("/check-auth",(req,res)=>{

    if(req.session.user){
        return res.json({
            authenticated:true,
            user:req.session.user
        });
    }

    res.json({
        authenticated:false
    });
});

//Order Router
router.post("/orderpage", orderController);
router.get("/myorder", orderGetController);
router.put("/admin/orders/:id", orderUpdateStatusController);
router.put("/myorder/:id", orderUpdateStatusController);
router.delete("/admin/orders/:id", orderrequestDeleteController);
router.get("/admin/dashboard", orderGetController);

export default router;