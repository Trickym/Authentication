const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
let users = {};
//SIGNUP
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password, "called");
    const userExist = users.hasOwnProperty(email);
    if (userExist) res.send("User Already Exists");
    const cryptPassword = await bcrypt.hash(password, 10);
    users = { ...users, [email]: { name, password: cryptPassword } };

    res.send("Success!");
  } catch (error) {
    console.log(error);
  }
});

//SIGNIN
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password, "login");
    if (users.hasOwnProperty(email)) {
      bcrypt.compare(password, users[email].password, (err, res1) => {
        if (err) {
          res.send(err);
        } else {
          if (res1) {
            res.send("Logged in Successfully!");
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
