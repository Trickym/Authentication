const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const createDB = require("./config/db");
const User = require("./models/userModel");
createDB.sync().then(() => {});
//SIGNUP
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, "called");
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (userExist) res.send("User Already Exists");
    const cryptPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: cryptPassword,
    };
    const create = await User.create(newUser);
    return res.status(201).send("Profile Created Successfully!");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

//SIGNIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "login");
    const userExist = await User.findOne({
      where: {
        email,
      },
    });
    if (userExist) {
      bcrypt.compare(password, userExist.dataValues.password, (err, res1) => {
        if (err) {
          res.send(err);
        } else {
          if (res1) {
            res.send({
              message: "Logged in Successfully!",
              userData: {
                email: userExist.dataValues.email,
                id: userExist.dataValues.id,
                name: userExist.dataValues.name,
                createdAt: userExist.dataValues.createdAt,
                updatedAt: userExist.dataValues.updatedAt,
              },
            });
          } else {
            res.send("Wrong username password!");
          }
        }
      });
    } else {
      res.send("User does not exists!");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
