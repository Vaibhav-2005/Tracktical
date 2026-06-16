import { approveUserAccountStatus } from "../models/admin.model.js";

const approveUserEmailID = async (req, res) => {
    const user = req.body;
    try {
        const status = await approveUserAccountStatus(user.uid);
        res.status(200).send({ "message": "User has been Approved by SuperAdmin" });
    } catch (e) {
        res.status(500).send("Internal Server Error");
    }
 
};

export { approveUserEmailID };