import { User } from "../models/index.js";
import bcrypt from 'bcrypt';
import webappLogger from "../logger/webappLogger.js";

const hashPassword = async (password) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}

const checkEmptyValues = (user) => {
    if (user.username === '' || user.password === '' || user.first_name === '' || user.last_name === '') {
        webappLogger.warn(`Empty values not allowed for fields: username, password, first_name, last_name`); 
        throw new Error('Empty values not allowed');
    }
}

export const createUser = async (user) => {
    const { username, password, first_name, last_name } = user;
    try {
        checkEmptyValues(user);
        if((user.id || user.account_created || user.account_updated)){
            webappLogger.error(`Cannot update username`);
            throw new Error('Cannot update username');
        }
        
        const hashedPassword = await hashPassword(password);

        const newuser = await User.create({
            username,
            password: hashedPassword,
            first_name,
            last_name
        });
        webappLogger.info(`User created with username: ${newuser.username}`);
        return User.scope('withoutPassword').findOne({ where: { username: newuser.username } });
    }
    catch (error) {
        console.log('error in creating user: ', error.message);
        webappLogger.error(`Error in creating user ${user.username}: ${error.message}`);
        throw new Error(error.message);
    }
}



export const getUser = async (user) => {
    try {
        const get_user = await User.scope('withoutPassword').findOne({ where: { username: user.username } });
        if(get_user){
            webappLogger.info(`User found with username: ${user.username}`);
        }
        return get_user;
    }
    catch (error) {
        webappLogger.error(`Error in getting user ${user.username}: ${error.message}`);
        throw new Error(error.message);
    }
}


export const updateUser = async (currentuserDetails, updateUserDetails) => {
    const updatePayload = {};
    try {

        checkEmptyValues(updateUserDetails);

        if((updateUserDetails.username || updateUserDetails.id || updateUserDetails.account_created || updateUserDetails.account_updated)){
            webappLogger.error(`Cannot update username for user: ${currentuserDetails.username}`);
            throw new Error('Cannot update username');
        }

        if(updateUserDetails.first_name){
            updatePayload.first_name = updateUserDetails.first_name;
        }
        if(updateUserDetails.last_name){
            updatePayload.last_name = updateUserDetails.last_name;
        }
        if(updateUserDetails.password){
            updatePayload.password = await hashPassword(updateUserDetails.password);
        }

        const updatedUser = await User.update(updatePayload, {
            where: { username: currentuserDetails.username},
            returning: true
        });
        if (updatedUser[0] === 0) {
            webappLogger.error(`User not found with username: ${currentuserDetails.username}`);
            throw new Error('User not found');
        }
        webappLogger.info(`User updated with username: ${currentuserDetails.username}`);
        return User.scope('withoutPassword').findOne({ where: { username: currentuserDetails.username } });
    }
    catch (error) {
        console.log('error in updating user: ', error.message);
        webappLogger.error(`Error in updating user ${currentuserDetails.username}: ${error.message}`);
        throw new Error(error.message);
    }
}