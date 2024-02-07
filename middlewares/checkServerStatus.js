import { sequelize } from "../database/database_connection.js";

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