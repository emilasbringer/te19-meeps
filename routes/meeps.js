var express = require('express');
var router = express.Router();

/* GET Meep page. */
router.get('/', function(req, res, next) {
    res.render('meeps.njk', {layout: "layout.njk", title: 'Express' });
  });

module.exports = router;