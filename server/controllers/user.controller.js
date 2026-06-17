import { findUserDetails, addNewUser } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const userSignUp = async (req, res) => {
    const user = req.body;
    try {
        if (!user.email_id || !user.mobile_number) res.status(400).send("Bad Request");
        const [userDetails] = await findUserDetails(user.email_id, user.mobile_number);
        if (!userDetails) {
            const newUserDetails = await addNewUser(user);
            res.status(200).send({ "message": "User Created Successfully" });
        }
        else res.status(409).send({
            'message': 'Email ID or Mobile Number already exists'
        });
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
};

const userLogin = async (req, res) => {
    const [user] = req.user;
    try {
        const payload = {
            uid: user.uid,
            username: user.email_id,
            account_status: user.account_status
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {expiresIn: '6h'});
        //Checks account_status
        if(!user.account_status){
            return res.status(202).json({
                message:"User Authenticated but not Approved by Admin",
                token: token
            });
        }
        return res.status(200).send({ 
            message:"User Login Successful",
            token: token
        });
    } catch (e) {
        console.log(e);
        res.status(500).send("Internal Server Error");
    }
}


const userProfileUpdate = async (req, res) => {
  res.status(404).send("Not Created Yet");
};


const userLogout = async (req, res) => {
  res.status(404).send("Not Created Yet");
};



export { userSignUp, userLogin, userLogout, userProfileUpdate };