import { User } from "../models/index.js";
import {getAuthHeaders} from './authentication.js';
import webappLogger from "../logger/webappLogger.js";

// check is user verified

export const checkAccountVerified = async (req, res, next) => {
    try {
        const auth = getAuthHeaders(req);
        if (auth == null) {
            webappLogger.error('Auth headers not found');
            console.log('Auth headers not found');
            return res.status(401).send();
        }
        const user = await User.findOne({ where: { username: auth.username } });
        if (!user) {
            webappLogger.error(`User not found with username: ${auth.username}`);
            console.log(`User not found with username: ${auth.username}`);
            return res.status(401).send();
        }
        if(user.account_verified === false){
            webappLogger.warn(`User not verified with username: ${auth.username}`);
            console.log(`User not verified with username: ${auth.username}`);
            return res.status(401).send();
        }
    }
    catch (error) {
        webappLogger.error(`Error in checking user: ${error.message}`);
        console.log('error in checking user: ', error.message);
        res.status(500).json({ message: error.message });
    }
    next();
}