import express from "express";
import health_check_router from "./healthCheckroute.js";
import { onlyGetMethodAllowed } from "../middlewares/methodNotAllowed.js";
import userRouter from "./userRoute.js";

const registerRouter = (app) => {
    app.use("/healthz",onlyGetMethodAllowed, health_check_router);
    app.use("/v1/user", userRouter);
}

export default registerRouter;