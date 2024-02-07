import express from 'express';
import { createUserController, getUserController, updateUserController } from '../controllers/userController.js';
import { authenticateUser } from '../middlewares/authentication.js';
import { use } from 'chai';

const userRouter = express.Router();

userRouter.route('/')
    .post((req, res) => {
        createUserController(req, res);
    })


userRouter.route('/self')
    .get(authenticateUser, (req, res) => {
        getUserController(req, res);
    }).put(authenticateUser, (req, res) => {
        updateUserController(req, res);
    });

userRouter.route('/*')
    .get((req, res) => {
        res.status(404).send();
    })
    .post((req, res) => {
        res.status(404).send();
    })
    .put((req, res) => {
        res.status(404).send();
    })
    .delete((req, res) => {
        res.status(404).send();
    });


export default userRouter;