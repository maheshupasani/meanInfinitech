var general = require(__dirname+"/general");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('category', { title: 'Express' });
  // console.log("hello");
});

router.post('/add', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // console.log(req.body);
  general.insert('category',req.body,function(a,b){
		// console.log(a)
		if (b) {
			res.send("ok")
		}else{
			console.log(a)
		}
	})
});


module.exports = router;
