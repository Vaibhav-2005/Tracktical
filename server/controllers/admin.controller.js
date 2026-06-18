import { approveUserAccountStatus } from "../models/admin.model.js";

const approveUserEmailID = async (req, res) => {
    const user = req.body.uid ? req.body : res.user;
    if(!user.uid) return res.status(404).json({message: "UID Not Found"});
    try {
        const status = await approveUserAccountStatus(user.uid);
        return res.status(200).send({ "message": "User has been Approved by SuperAdmin" });
    } catch (e) {
        return res.status(500).send("Internal Server Error");
    }
};

export { approveUserEmailID };