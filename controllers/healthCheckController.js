import {sequelize} from "../database/database_connection.js";
import {healthCheck} from "../services/healthCheckService.js";


const responseHeaders = {
    "Cache-Control": "no-cache",
    "Date": new Date().toGMTString()
}

export const databaseConnect = async (req,res) => {
    res.header(responseHeaders);
    try {
        if (Object.keys(req.body).length > 0 || Object.keys(req.query).length > 0) {
            return res.status(400)
                      .send();
        }

        if(req.headers["simulate-failure"] === "true"){
            return res.status(503)
                      .send();
        }
        await healthCheck(req, res);
    } catch (error) {
        return res.status(503)
                  .send();
    }
}