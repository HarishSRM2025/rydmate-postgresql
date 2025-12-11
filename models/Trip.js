const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Trip = sequelize.define("Trip", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    userId: { 
        type: DataTypes.INTEGER,
        allowNull: false 
    },

    driverId: { 
        type: DataTypes.INTEGER,
        allowNull: true    // Assigned later
    },

    trip_type: {
        type: DataTypes.ENUM("normal", "round"),
        defaultValue: "normal",
        allowNull: false
    },

    pickup_location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    drop_location: {
        type: DataTypes.STRING,
        allowNull: false
    },

    pickup_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    pickup_time: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Only for ROUND TRIP
    return_date: {
        type: DataTypes.DATEONLY,
        allowNull: true
    },

    return_time: {
        type: DataTypes.STRING,
        allowNull: true
    },

    fare: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    vehicle:{
        type:DataTypes.ENUM("auto", "car", "bike"),
        defaultValue:"auto",
        allowNull:true
    },
    status: {
        type: DataTypes.ENUM("pending", "accepted", "on-trip", "completed", "cancelled"),
        defaultValue: "pending"
    }
});

module.exports = Trip;
