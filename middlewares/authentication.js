import bcrypt from 'bcrypt';

import { User } from '../models/index.js';

export const authenticateUser = async (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) {
        return res.status(401).send();
    }
    const base64Credentials = auth.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');
    const user = await User.findOne({ where: { username } });
    if (!user) {
        return res.status(401).send();
    }
    const verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword) {
        return res.status(401).send();
    }
    req.user = user;
    next();
    }

// auth headers