import { sequelize } from "../database/database_connection.js";
import webappLogger from "../logger/webappLogger.js";

export const healthCheck = async (req, res) => {
    try{
        await sequelize.authenticate();
        res.status(200).send();
        webappLogger.info(`Health check passed with status code 200`);
        return
    }
    catch(error){
        res.status(503).send();
        webappLogger.error(`Health check failed with status code 503: ${error.message}`);
        return
    }
}