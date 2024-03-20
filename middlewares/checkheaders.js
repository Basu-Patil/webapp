// check the request query to not have any query parameters
import webappLogger from "../logger/webappLogger.js";
export const noQueryParams = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        webappLogger.warn(`Invalid request with query parameters: ${req?.originalUrl}`);
        return res.status(400).send();
    }
    next();
}