const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Enquiry = sequelize.define("Enquiry", {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    phone:{type:DataTypes.STRING,allowNull:false}
});

module.exports = Enquiry;
