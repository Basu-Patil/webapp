import { User } from "../models/index.js";
import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
    const saltOrRounds = 10;
    return await bcrypt.hash(password, saltOrRounds);
}


export const createUser = async (user) => {
    const { username, password, first_name, last_name } = user;
    try {
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
    const { first_name, last_name, password } = updateUserDetails;
    try {
        if((updateUserDetails.username || updateUserDetails.account_created || updateUserDetails.account_updated || updateUserDetails.id)){
            throw new Error('Cannot update username');
        }
        const username = currentuserDetails.username;
        const updatedPassword = password || currentuserDetails.password;
        const hashedPassword = await hashPassword(updatedPassword);

        const updatedUser = await User.update({
            first_name,
            last_name,
            password: hashedPassword
        }, {
            where: { username },
            returning: true
        });
        if (updatedUser[0] === 0) {
            throw new Error('User not found');
        }
        return User.scope('withoutPassword').findOne({ where: { username } });
    }
    catch (error) {
        console.log('error in updating user: ', error.message);
        throw new Error(error.message);
    }
}