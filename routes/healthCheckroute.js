import express from 'express';
import {databaseConnect } from "../controllers/healthCheckController.js";

const health_check_router = express.Router();

health_check_router.route("/")
    .get(databaseConnect);

health_check_router.route('/*')
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


export default health_check_router;
