var general = require(__dirname+"/general");
var express = require('express');
const nodemailer = require('nodemailer');
var router = express.Router();
var validator = require('validator');
var Client = require('node-rest-client').Client;
var session = require('express-session');
 
var client = new Client();
var bcrypt = require('bcrypt');
const saltRounds = 10;

var app = express();

// function check_session(req,res,next){
// 	if(req.session){
// 		if(req.session.user_email){
// 			// console.log('1')
// 			res.redirect('/')
// 		}else{
// 			next()
// 		}
// 	}else{
// 		next()
// 	}
// }
// function check_session(req,res,next){
// 	if(req.session){
// 		if(req.session.email){
// 			res.redirect('/')
// 		}else{
// 			res.next()
// 		}
// 	}else{
// 		res.next()
// 	}
// }
/* GET home page. */
router.get('/', function(req, res, next) {
	res.locals.user_email = 'mahesh';
	console.log(req.session);
	// console.log('session');

  res.render('index', { title: 'Express' });
});

router.get('/menu',function(req,res,next){
	// res.send("hello");
	general.select('*','category',1,function(a,b){
		// console.log(a)
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
		// console.log(a)
		if (b) {
			res.send(JSON.stringify(b))
		}else{
			console.log(a)
		}
	})
})
router.post('/getProbyCat',function(req,res,next){
	// res.send("hello");
	general.select('*','product',"cat_id="+req.body.cat_id,function(a,b){
		// console.log(a)
		if (b) {
			res.send(JSON.stringify(b))
		}else{
			console.log(a)
		}
	})
})
router.get('/cart',function(req,res,next){
	res.render('cart');	
})
router.post('/getCartProduct',function(req,res,next){
	general.select('*','product',"id in ("+req.body.id+")",function(a,b){
		// console.log(a)
		if (b) {
			res.send(JSON.stringify(b))
		}else{
			console.log(a)
		}
	})
})
router.get('/email',function(req,res){

	let transporter = nodemailer.createTransport({
        host: 'php-training.in',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vishal@php-training.in', // generated ethereal user
            pass: 'Vishal@123' // generated ethereal password
        },
        tls:{
        	rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo" <vishal@php-training.in>', // sender address
        to: 'upasanimr30@gmail.com,ajoshi6992@gmail.com,nikhilaparab16@gmail.com', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
        	console.log("ok")
        }
        // console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
});
router.post('/registerAction',function(req,res,next){
	// console.log(req.body);
	console.log(validator.isAlpha(req.body.name))
	if(validator.isAlpha(req.body.name) === false){
		res.send('Invalid Name');
	}else if(validator.isEmail(req.body.email)  === false){
		res.send('Enter Valid Mail');
	}else if(validator.isInt(req.body.mobile,{min:10}) === false){
		res.send('Mobile no should be 10digit');
	}else if(validator.isAlphanumeric(req.body.password) === false){
		res.send('Password should be alphanumeric');
	}else if(validator.equals(req.body.password,req.body.cpassword) === false){
		res.send('Password mismatch');
	}else{
		let transporter = nodemailer.createTransport({
        host: 'php-training.in',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'vishal@php-training.in', // generated ethereal user
            pass: 'Vishal@123' // generated ethereal password
        },
        tls:{
        	rejectUnauthorized:false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Fred Foo" <vishal@php-training.in>', // sender address
        to: req.body.email, // list of receivers
        subject: 'Hello', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
        	//res.send('Registered')
        	client.get("http://api.textlocal.in/send/?username=vishalgaikwad1718@gmail.com&hash=c1c602fbd92dc9bff75b0ca2923d55aa6682d264f1a1c59ead008fa99688329c&message=testing&sender=TXTLCL&numbers=918655331310&test=0", function (data, response) {
			    // parsed response body as js object 
			    //console.log(data);
			    // raw response 
			    //console.log(response);
			    if(data){
			    	delete req.body.cpassword;
			    	console.log(req.body);
			    	bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
			    		req.body.password = hash
					  // Store hash in your password DB.
					     	general.insert('users',req.body,function(a,b){
						// console.log(a)
						if (b) {
							res.send("User registered")
						}else{
							console.log(a)
						}
					})
					});
			 
			    }
			});
        }
        // console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
    
		
	}
});

router.post('/loginAction',function(req,res,next){			
	if(!req.body.email || !req.body.password){
		res.send('Please Enter Values')
	}else{
		useremail = req.body.email;
		userpass = req.body.password;
		general.select('*','users',"email='"+useremail+"'",function(err,result){
			if(err){
				console.log(err)
			}else{
				// console.log(result)
				if(result.length == 0){
					res.send('Invalid Credintials');
				}else{
					db_password = result[0].password
					// console.log(db_password);
					bcrypt.compare(userpass, db_password, function(err_bcrypt, res_bcrypt) {
					    // console.log(res_bcrypt)
					    if(res_bcrypt){
					    	req.session.user_email = result[0].email;
					    	req.session.user_mobile = result[0].mobile;
					    	req.session.user_name = result[0].name;
					    	req.session.user_id = result[0].id;

					    	res.app.locals.user_email = result[0].email;
					    	res.app.locals.user_mobile = result[0].mobile;
					    	res.app.locals.user_name = result[0].name;
					    	res.app.locals.user_id = result[0].id;

					    	res.send('ok');
					    }else{
					    	res.send('Invalid Credintials')
					    }
					});
				}
			}
		});	
	}
})

// router.get('/afterLogin',check_session,function(req,res){
// console.log('ok')
// });
router.get('/logout',function(req,res){
req.session.destroy(function(err) {
     res.redirect('/')
  })
})
module.exports = router;
