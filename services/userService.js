import { User } from "../models/index.js";
import bcrypt from 'bcrypt';
import webappLogger from "../logger/webappLogger.js";
import { PubSub } from '@google-cloud/pubsub';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();


// const publishMessage = async (message) => {
//     const pubSubClient = new PubSub({
//         projectId: "csye6225-413706",
//     });
//     const topicName = 'projects/csye6225-413706/topics/verify_email_manual';
//     console.log(`message: ${JSON.stringify(message)}`)
//     const dataBuffer = Buffer.from(JSON.stringify(message));
//     try {
//         console.log('Entered publishMessage try block')
//         const messageId = await pubSubClient.topic(topicName).publishMessage(dataBuffer);
//         console.log(`Message ${messageId} published.`);
//         return messageId;
//     } catch (error) {
//         console.error(`Received error while publishing: ${error.message}`);
//         throw new Error(error.message);
//     }
// }

const pubSubClient = new PubSub({
            projectId: "csye6225-413706",
        });
async function publishMessage(topicNameOrId, data) {
    // Publishes the message as a string, e.g. "Hello, world!" or JSON.stringify(someObject)
    const dataBuffer = Buffer.from(JSON.stringify(data));
  
    try {
      const messageId = await pubSubClient
        .topic(topicNameOrId)
        .publishMessage({data: dataBuffer});
      console.log(`Message ${messageId} published.`);
    } catch (error) {
      console.error(`Received error while publishing: ${error.message}`);
      process.exitCode = 1;
    }
  }

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
        if((user.id || user.account_created || user.account_updated || user.account_verified || user.email_sent)){
            webappLogger.error(`Cannot update readonly fields, triggered by user: ${user.username}`);
            throw new Error('Cannot update readonly fields');
        }
        
        const hashedPassword = await hashPassword(password);

        const uniqueToken = uuidv4();
        const expires_at = new Date().getTime() + 120000;

        const newuser = await User.create({
            username,
            password: hashedPassword,
            first_name,
            last_name,
            expires_at,
            validation_id: uniqueToken
        });
        webappLogger.info(`User created with username: ${newuser.username}`);
        
        const webappUrl = process.env.WEBAPP_URL || 'http://localhost';

        const message = {
            toAddress: username,
            subject: 'Verify your account',
            link: `${webappUrl}:${process.env.PORT}/verify?token=${uniqueToken}&username=${username}`,
            fullName: `${first_name} ${last_name}`
        }
        const msgId = await publishMessage('projects/csye6225-413706/topics/verify_email_manual',message);
        console.log(`Message published with ID: ${msgId}`);
        webappLogger.info(`Email sent to user: ${newuser.username}`);

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

        if((updateUserDetails.username || updateUserDetails.id || updateUserDetails.account_created || updateUserDetails.account_updated || updateUserDetails.account_verified || updateUserDetails.email_sent)){
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