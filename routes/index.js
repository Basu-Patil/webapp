import express from "express";
import health_check_router from "./healthCheckroute.js";
import { onlyGetMethodAllowed } from "../middlewares/methodNotAllowed.js";
import { noQueryParams } from "../middlewares/checkheaders.js";
import { healthCheck } from "../middlewares/checkServerStatus.js";
import userRouter from "./userRoute.js";
import webappLogger from "../logger/webappLogger.js";
import verifyUserRouter from "./verifyUserRoute.js";

const registerRouter = (app) => {
    webappLogger.info('Entering registerRouter function in routes/index.js');
    app.use("/healthz",healthCheck, onlyGetMethodAllowed, noQueryParams, health_check_router);
    app.use("/v1/user",healthCheck, noQueryParams, userRouter);
    app.use('/verify',verifyUserRouter);
    webappLogger.info('Exiting registerRouter function in routes/index.js');
}

export default registerRouter;