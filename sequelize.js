const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("rydmate", "root", "2526", {
    host: "localhost",
    dialect: "mysql"
});

sequelize.authenticate()
    .then(() => console.log("MySQL Connected"))
    .catch(err => console.log("DB Error:", err));

module.exports = sequelize;
