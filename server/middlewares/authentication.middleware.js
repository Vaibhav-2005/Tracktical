import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization;
    if(!token) return res.status(404).send("Token Not Found");
    try{
        const decoded = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET_KEY);
        if(decoded) {
            res.user = decoded;
            if (decoded.account_status || req.path === "/referallCodeAccountActivation") next();
            else return res.status(202).json({message:"User Authenticated but not Approved by Admin"});
        }
        else return res.status(401).send({error:"Unauthorized"});
    } catch(error){
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({message: "Token Expired! Please Login Again"});
        }
        else{
            console.log(error);
            return res.status(401).json({message: "Invalid Token"});
        }
    }
}

const isSuperAdminAuthenticated = async (req, res, next) => {
    if(res.user.uid === 1) next();
    else return res.status(401).json({message: "You are not Authorized to Approve Members. Only a SuperAdmin can approve new users."});
}

const referralCodeVerification = async(req, res, next) =>{
    if(req.body.activation_code === process.env.REFERALL_CODE_ACTIVATION){
        next();
    }
    else return res.status(401).send("Wrong Activation Code!");
}

export { isAuthenticated, isSuperAdminAuthenticated, referralCodeVerification };