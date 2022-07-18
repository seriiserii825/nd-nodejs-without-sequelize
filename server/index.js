require("dotenv").config();
const colors = require("colors");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 8087;
const userRoutes = require("./routes/user.route");
const sequelize = require("./db-conection");


sequelize.sync();
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", userRoutes);

app.listen(PORT, function () {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Db connect successfully".underline.bgCyan.red);
    })
    .catch((err) => {
      console.log("Db connect error".underline.bgRed.white, err.original);
    });
});
