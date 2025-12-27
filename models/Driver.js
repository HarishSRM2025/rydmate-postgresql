const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Driver = sequelize.define("Driver", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false
  },

  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },

  vehicle_model: {
    type: DataTypes.STRING,
    allowNull: false
  },

  vehicle_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  vehicle_color: {
    type: DataTypes.STRING,
    allowNull: false
  },

  license_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  year_of_exp: {
    type: DataTypes.INTEGER,
    allowNull: false
  },

  no_of_trips: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },

  total_earning: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  },

  online: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

module.exports = Driver;
