import sequelize from "../database/database_connection.js";
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
},{
    tableName: 'users',
    createdAt: 'account_created',
    updatedAt: 'account_updated',
    scopes:{
        withoutPassword: {
            attributes: {exclude: ['password']}
        },
        withoutId:{
            attributes: {exclude: ['id']}
        }
    },
    indexes:[
        {
            unique: true,
            fields: ['username'],
            name: 'idx_username'
        }
    ]
});

export default User;