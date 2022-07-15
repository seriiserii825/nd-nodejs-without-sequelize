require("dotenv").config();
const colors = require("colors");
const bodyParser = require("body-parser");
const express = require("express");
const cookieParser = require("cookie-parser");
const Sequelize = require("sequelize");
const app = express();
const PORT = process.env.PORT || 8087;
const sequelize = new Sequelize("node_orm", "root", "Serii1981;", {
  host: "localhost",
  dialect: "mysql",
});

app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  return res.send("Hello World");
});

const User = sequelize.define(
  "tbl_user",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM("1", "0"),
      defaultValue: "1",
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    modelName: "User",
    timestamps: false,
  }
);

app.post("/user", (req, res) => {
  User.create(req.body)
    .then((response) => {
      return res.status(200).json({
        status: 1,
        message: "User created successfully",
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 0,
        message: "Error while creating user:" + err,
      });
    });
});

sequelize.sync();

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
