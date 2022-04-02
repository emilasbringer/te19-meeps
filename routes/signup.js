var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup.njk', {layout: "layout.njk", title: 'Meeper' });
});

module.exports = router;
