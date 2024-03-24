import express from 'express';
import { createUserController, getUserController, updateUserController } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authentication.js';
import webappLogger from '../logger/webappLogger.js';
import { checkAccountVerified } from '../middlewares/checkAccountVerified.js';

const userRouter = express.Router();

userRouter.route('/')
    .post((req, res) => {
        webappLogger.debug(`Received POST request on /user`);
        createUserController(req, res);
    })


userRouter.route('/self')
    .get(checkAccountVerified, authenticateUser, (req, res) => {
        webappLogger.debug(`Received GET request on /user/self`);
        getUserController(req, res);
    }).put(checkAccountVerified, authenticateUser, (req, res) => {
        webappLogger.debug(`Received PUT request on /user/self`);
        updateUserController(req, res);
    });

userRouter.route('/*')
    .get((req, res) => {
        webappLogger.warn(`Invalid endpoint: ${req?.originalUrl} for GET request`);
        res.status(404).send();
    })
    .post((req, res) => {
        webappLogger.warn(`Invalid endpoint: ${req?.originalUrl} for POST request`);
        res.status(404).send();
    })
    .put((req, res) => {
        webappLogger.warn(`Invalid endpoint: ${req?.originalUrl} for PUT request`);
        res.status(404).send();
    })
    .delete((req, res) => {
        webappLogger.warn(`Invalid endpoint: ${req?.originalUrl} for DELETE request`);
        res.status(404).send();
    });


export default userRouter;