import { sequelize } from "../database/database_connection.js";

export const healthCheck = async (req, res) => {
    try{

        await sequelize.authenticate();
        res.status(200).send();
        return
    }
    catch(error){
        res.status(503).send();
        return
    }
}