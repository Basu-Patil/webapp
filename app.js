import cors from 'cors';
import express from 'express';
import { Sequelize } from 'sequelize';
import registerRouter from './routes/index.js';

const initialize = (app) => {
    app.use(express.json());
    app.use(express.urlencoded());
    registerRouter(app);
}

export default initialize;