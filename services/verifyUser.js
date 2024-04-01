import { User } from "../models/index.js";
import webappLogger from "../logger/webappLogger.js";

// verify user by checking the token and updating the user status

export const verifyUser = async (token, username) => {
    try {

        const user = await User.findOne({ where: { username: username } });
        if (!user) {
            webappLogger.error(`User not found with username: ${username}`);
            throw new Error('User not found');
        }
        if(user?.email_sent === false || user?.validation_id === null){
            webappLogger.error(`Email not sent to user: ${username}`);
            throw new Error('Invalid link.');
        }

        const validate = await validateUser(user, token);
        if (validate) {
            user.account_verified = true;
            await user.save();
            webappLogger.info(`User ${user.username} verified successfully`);
            return `User ${user.username} verified successfully. You can now access the webapp.`;
        }
        else {
            webappLogger.error(`User not found with username: ${username}`);
            throw new Error('User not found');
        }
    }
    catch (error) {
        console.log('error in verifying user: ', error.message);
        webappLogger.error(`Error in verifying user: ${error.message}`);
        throw new Error(error.message);
    }
}

const validateUser = async (user, token) => {
    if(user && user.validation_id !== token){ 
        webappLogger.error(`Invalid token for user: ${user.username}`);
        throw new Error('Invalid token');
    }
    if (user.expires_at < Date.now()) {
        webappLogger.error(`Token expired for user: ${user.username}`);
        throw new Error('Token expired');
    }

    return true
}