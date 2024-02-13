import cors from 'cors';
import express from 'express';
import { Sequelize } from 'sequelize';
import registerRouter from './routes/index.js';
import bodyParser from 'body-parser';

const initialize = (app) => {
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(bodyParser.json());
    app.use((err, req, res, next) => {
        if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
            // If JSON parsing error, send 400 Bad Request with error message
            res.status(400).json({ error: 'Invalid JSON data' });
        } else {
            // For other errors, pass to the default error handler
            next(err);
        }
    });
    registerRouter(app);
}

export default initialize;