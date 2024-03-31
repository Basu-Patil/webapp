import { verifyUser } from "../services/verifyUser.js";


export const verifyUserController = async (req, res) => {
    try {
        const token = req.query?.token;
        const username = req.query?.username;
        const succes_msg = await verifyUser(token, username);
        res.status(200).send(succes_msg);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}