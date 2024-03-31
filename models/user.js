import {sequelize} from "../database/database_connection.js";
import { DataTypes } from 'sequelize';
const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    account_verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    email_sent: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    expires_at: {
        type: DataTypes.DATE,
        allowNull: true
    },
    validation_id: {
        type: DataTypes.UUID,
        allowNull: false,
    },
},{
    tableName: 'users',
    createdAt: 'account_created',
    updatedAt: 'account_updated',
    scopes:{
        withoutPassword: {
            attributes: {exclude: ['password', 'email_sent', 'account_verified', 'expires_at', 'validation_id']}
        },
        withoutId:{
            attributes: {exclude: ['id']}
        }
    }
});

export default User;