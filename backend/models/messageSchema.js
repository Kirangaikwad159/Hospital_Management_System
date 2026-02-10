const {sequelize} = require('../config/connectDB');
const {DataTypes} = require('sequelize');

const messageSchema = sequelize.define(
    "message",
    {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        firstName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        message:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        status:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    },
    {
        timestamps: true,
        tableName: "messages"
    }
)

module.exports = messageSchema;