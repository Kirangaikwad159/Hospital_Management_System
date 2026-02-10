const { sequelize } = require('../config/connectDB');
const { DataTypes } = require('sequelize');

const appointmentSchema = sequelize.define("appointment", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nic: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    gender: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
    },

    appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },

    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    doctorFirstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    doctorLastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    hasVisited: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },

    doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    patientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM("Pending", "Accepted", "Rejected"),
        defaultValue: "Pending",
        allowNull: false,
    }
},
{
    timestamps: true,
    tableName: "appointments"
});

module.exports = appointmentSchema;
