 import jwt from "jsonwebtoken"

const authMiddleware = async (req,res,next)=>{
   
   const {token} = req.headers;

   if(!token){
    res.json({success:false, message:"Not Authorized Login Again"})
   }

   try{
      const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
      req.body.userId = tokenDecode.id; 
    //  console.log("Decoded token:", req.body.userId);
      next();   
      }
   catch(error){
    console.log(error);
    res.json({success:false, message:"Error in mw"})
    
   }
}

export default authMiddleware;