var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id/edit', function(req, res, next) {
  res.render('edit.njk', {layout: "layout.njk", title: 'Express' });
  
});

module.exports = router;
