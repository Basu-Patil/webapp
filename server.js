// server.js
import express from 'express';
import initialize from './app.js';
import dotenv from 'dotenv';
import sequelize, { createDatabase } from './database/database_connection.js';
import { User } from './models/index.js';
import mysql from 'mysql2/promise';

dotenv.config();

const app = express();

const port = process.env.PORT;



initialize(app);


createDatabase()
    .then(() => {
        console.log("Database created successfully");
        sequelize.sync({ alter: true })
            .then(() => {
                app.listen(port, () => console.log(`Server is listening at port ${port}`));
            })
            .catch((error) => {
                console.log("Error in connecting to database: ", error);
            });
    })
    .catch((error) => {
        console.log("Error in creating database: ", error);
        throw error;
    });

export default app;
