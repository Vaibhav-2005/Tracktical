import { findUserDetails, addNewUser } from "../models/user.model.js";

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
    const user = req.body;
    try {
        if(user.account_status === "FALSE"){
            res.status(202).send("User Authenticated but not Approved by Admin");
        }
        //generation of jwt token
        //also remember to check if the account is activated or not
        res.status(200).send("User Login Successful");
    } catch (e) {
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