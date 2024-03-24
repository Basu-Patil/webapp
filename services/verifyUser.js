import { User } from "../models/index.js";
import webappLogger from "../logger/webappLogger.js";
import jwt from 'jsonwebtoken';

// verify user by checking the token and updating the user status

export const verifyUser = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ where: { username: decoded.username } });
        if(user.email_sent === false){
            webappLogger.error(`Email not sent to user: ${decoded.username}`);
            throw new Error('Invalid link.');
        }
        if (user) {
            user.account_verified = true;
            await user.save();
            webappLogger.info(`User ${user.username} verified successfully`);
            return `User ${user.username} verified successfully. You can now access the webapp.`;
        }
        else {
            webappLogger.error(`User not found with username: ${decoded.username}`);
            throw new Error('User not found');
        }
    }
    catch (error) {
        console.log('error in verifying user: ', error.message);
        webappLogger.error(`Error in verifying user: ${error.message}`);
        throw new Error(error.message);
    }
}