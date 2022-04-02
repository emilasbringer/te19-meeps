var express = require('express');
const pool = require('../database');
var router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next) => {
  await pool.promise()
  .query('SELECT * FROM users WHERE name = ?', [req.session.loginToken])
  .then(([rows, fields]) => {
    console.log(rows);
      if (rows.length > 0) {
        
        res.render("profile.njk", {data: rows, token: req.session.loginToken})
      } else {
        req.session.error = "You are not logged in";
        res.redirect("/login");

      }
  })
  .catch(err => {
      console.log(err);
      res.status(500).json({
          users: {
              error: "Error getting users"
          }
      })
  });
});

router.post('/editBody', async (req, res, next) => {
  //console.log(req.body.username);
  const newBody = req.body.newBody;
  const username = req.body.username;
  await pool.promise()
  .query("UPDATE users SET body = ? WHERE name = ?", [newBody, username])
  .then(([rows]) => {
    res.redirect("/profile");
  })
});

module.exports = router;