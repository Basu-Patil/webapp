import express from "express";
import health_check_router from "./healthCheckroute.js";
import { onlyGetMethodAllowed } from "../middlewares/methodNotAllowed.js";
import { noQueryParams } from "../middlewares/checkheaders.js";
import { healthCheck } from "../middlewares/checkServerStatus.js";
import userRouter from "./userRoute.js";

const registerRouter = (app) => {
    app.use("/healthz",healthCheck, onlyGetMethodAllowed, noQueryParams, health_check_router);
    app.use("/v1/user",healthCheck, noQueryParams, userRouter);
}

export default registerRouter;