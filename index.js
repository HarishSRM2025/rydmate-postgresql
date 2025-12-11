const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();
const sequelize = require("./sequelize");
sequelize.sync({ alter: true })
  .then(() => console.log("Tables Updated!"))
  .catch(err => console.log(err));

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());


// Routes
app.use("/api/user", require("./routes/userRoutes"));
app.use("/api/driver", require("./routes/driverRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/trip", require("./routes/tripRoutes"));

app.listen(3000, () => console.log("Server running on 3000"));
