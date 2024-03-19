import { sequelize } from "../database/database_connection.js";
import webappLogger from "../logger/webappLogger.js";

export const healthCheck = async (req, res, next) => {
    try{

        await sequelize.authenticate();
        next();
        return
    }
    catch(error){
        return res.status(503).send();
    }
}