var general = require(__dirname+"/general");
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/menu',function(req,res,next){
	// res.send("hello");
	general.select('*','category',1,function(a,b){
		console.log(a)
		if (b) {
			res.send(JSON.stringify(b))
		}else{
			console.log(a)
		}
	})
})
router.get('/allProduct',function(req,res,next){
	// res.send("hello");
	general.select('*','product',1,function(a,b){
		console.log(a)
		if (b) {
			res.send(JSON.stringify(b))
		}else{
			console.log(a)
		}
	})
})
module.exports = router;
