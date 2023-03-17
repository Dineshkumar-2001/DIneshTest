const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const db = require("../lib/db.js");
const userMiddleware = require("../middleware/users.js");
const { validateRegister } = require("../middleware/users.js");
router.post("/sign-up", (req, res, next) => {
  console.log("reqq::", req.body);
  db.query(
    `SELECT * FROM users WHERE username = "${req.body.username}";`,
    (err, result) => {
      console.log("result 1::", result);
      if (err) {
        return err;
      }
      if (result.length) {
        return res.status(409).send({
          msg: "This username is already in use!",
        });
      } else {
        console.log("else block");
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            throw err;
            // return res.status(500).send({
            //   msg: err,
            // });
          } else {
            console.log("insert query here");
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (username, new_password) VALUES ("${req.body.username}",' ${hash}')`,
              (err, result) => {
                if (err) {
                  //   throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(200).send({
                  msg: "Registered!",
                });
              }
            );
          }
        });
      }
    }
  );
});

// http://localhost:3000/api/login
router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE username = ${db.escape(req.body.username)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status.apply(400).send({
          message: err,
        });
      }
      if (!result.length) {
        return res.status(400).send({
          message: "Username or password incorrect!",
        });
      }

      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(400).send({
              message: "Username or password incorrect!",
            });
          }
          if (bResult) {
            //password match
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              " SECRET",
              { expiresIn: "7d" }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              message: "Logged in!",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            message: "Username or password incorrect!",
          });
        }
      );
    }
  );
});
router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});
module.exports = router;
