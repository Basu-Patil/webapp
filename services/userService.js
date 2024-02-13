import { User } from "../models/index.js";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}

const checkEmptyValues = (user) => {
    if (user.username === '' || user.password === '' || user.first_name === '' || user.last_name === '') {
        throw new Error('Empty values not allowed');
    }
}

export const createUser = async (user) => {
    const { username, password, first_name, last_name } = user;
    try {
        checkEmptyValues(user);
        if((user.id || user.account_created || user.account_updated)){
            throw new Error('Cannot update username');
        }
        
        const hashedPassword = await hashPassword(password);

        const newuser = await User.create({
            username,
            password: hashedPassword,
            first_name,
            last_name
        });

        return User.scope('withoutPassword').findOne({ where: { username: newuser.username } });
    }
    catch (error) {
        console.log('error in creating user: ', error.message);
        throw new Error(error.message);
    }
}



export const getUser = async (user) => {
    try {

        return User.scope('withoutPassword').findOne({ where: { username: user.username } });
    }
    catch (error) {
        console.log('error in getting user: ', error.message);
        throw new Error(error.message);
    }
}


export const updateUser = async (currentuserDetails, updateUserDetails) => {
    const updatePayload = {};
    try {

        checkEmptyValues(updateUserDetails);

        if((updateUserDetails.username || updateUserDetails.id || updateUserDetails.account_created || updateUserDetails.account_updated)){
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
            throw new Error('User not found');
        }
        return User.scope('withoutPassword').findOne({ where: { username: currentuserDetails.username } });
    }
    catch (error) {
        console.log('error in updating user: ', error.message);
        throw new Error(error.message);
    }
}