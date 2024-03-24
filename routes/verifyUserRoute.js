import express from "express";
import { verifyUserController } from "../controllers/verifyUserController.js";


const verifyUserRouter = express.Router();

verifyUserRouter.route('/')
    .get((req, res) => {
        verifyUserController(req, res);
    });

verifyUserRouter.route('/*')
    .get((req, res) => {
        res.status(404).send(`Invalid endpoint: ${req?.originalUrl} for GET request`);
    })
    .post((req, res) => {
        res.status(404).send(`Invalid endpoint: ${req?.originalUrl} for POST request`);
    })
    .put((req, res) => {
        res.status(404).send(`Invalid endpoint: ${req?.originalUrl} for PUT request`);
    })
    .delete((req, res) => {
        res.status(404).send(`Invalid endpoint: ${req?.originalUrl} for DELETE request`);
    });

    export default verifyUserRouter;