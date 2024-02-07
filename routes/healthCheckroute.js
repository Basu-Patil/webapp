import express from 'express';
import {databaseConnect } from "../controllers/healthCheckController.js";

const health_check_router = express.Router();

health_check_router.route("/")
    .get(databaseConnect);



export default health_check_router;
