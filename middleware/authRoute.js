const isAuth = (req, res)=>{
    if(!req.session.username){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    next();
}

export default isAuth