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
        
        if (!user.email_id || !user.password || !user.mobile_number) res.status(400).send("Email_id or Password is Missing");
        const [userDetails] = await findUserDetails(user.email_id, user.mobile_number);
        if (!userDetails) res.status(404).send("User Not Found! Register First");
        if (userDetails.email_id === user.email_id && userDetails.mobile_number === user.mobile_number) {
            //login

        }
        else {
            res.status(409).send({ "message": "User already exists with given mobile or email" });
        }
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