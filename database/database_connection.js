import { Sequelize } from 'sequelize';
import dotenv, { config } from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const createDatabase = async () => {
    try {
      const connection = await mysql.createConnection({
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT
      });
  
      await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.MYSQL_DATABASE};`);
      await connection.end();
    } catch (error) {
      console.error('Error creating database:', error);
      throw error;
    }
  }

export const sequelize = new Sequelize({
    dialect: "mysql",
    host: process.env.MYSQL_HOST,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    logging: false,
    port: process.env.MYSQL_PORT
})