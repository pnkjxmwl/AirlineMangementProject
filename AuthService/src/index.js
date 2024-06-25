const express = require("express");
const bodyParser = require("body-parser");
const { PORT, JWT_KEY } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index.js");
const app = express();

const prepareAndStartServer = () => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api", apiRoutes);
  app.listen(PORT, async () => {
    console.log(`Auth Server started at ${PORT}`);

    if (process.env.DB_SYNC == true) {
      db.sequelize.sync({ alter: true });
    }
  });
};
prepareAndStartServer();
