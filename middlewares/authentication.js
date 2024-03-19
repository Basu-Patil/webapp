import bcrypt from 'bcrypt';

import { User } from '../models/index.js';

import webappLogger from '../logger/webappLogger.js';

export const authenticateUser = async (req, res, next) => {
    const auth = getAuthHeaders(req);
    if (auth == null) {
        webappLogger.error('Auth headers not found');
        return res.status(401).send();
    }
    const user = await User.findOne({ where: { username: auth.username } });
    if (!user) {
        webappLogger.error(`User not found with username: ${auth.username}`);
        return res.status(401).send();
    }
    const verifyPassword = await bcrypt.compare(auth.password, user.password);
    if (!verifyPassword) {
        webappLogger.error(`Password not matched for username: ${auth.username}`);
        return res.status(401).send();
    }
    webappLogger.info(`User authenticated with username: ${auth.username}`);
    req.user = user;
    next();
    }

// auth headers

export const getAuthHeaders = (req) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return null;
    }
    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    return { username, password };
}