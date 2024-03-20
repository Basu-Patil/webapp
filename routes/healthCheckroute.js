import express from 'express';
import {databaseConnect } from "../controllers/healthCheckController.js";
import webappLogger from '../logger/webappLogger.js';

const health_check_router = express.Router();

health_check_router.route("/")
    .get(databaseConnect);

health_check_router.route('/*')
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


export default health_check_router;
