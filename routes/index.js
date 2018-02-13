var general = require(__dirname+"/general")
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/menu', function(req, res, next) {
  res.send('Hello')
  console.log(general.select)
});

module.exports = router;
