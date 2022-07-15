const express = require("express");
const router = express.Router();
const User = require("./models/user.model");

router.get("/", (req, res) => {
  return res.json({
    status: 1,
    message: "Hello World",
  });
});

router.post("/user", (req, res) => {
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

module.exports = router;
