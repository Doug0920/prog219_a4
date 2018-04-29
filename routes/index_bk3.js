var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  GET Hello World page. */
router.get('/helloworld', function(req, res)  {
	res.render('helloworld', {title: 'Hello, World! This is Doug' });
});

/* the GET Userlist page  */
router.get('/userlist', function(req, res) {
	var db = req.db;
	var collection = db.get('Usercollection');  // get full collection
	collection.find({}, {}, function(e, docs) {  // render the data
		res.render('userlist', {
			"userlist" : docs
		});
	});
});

/* GET new user page  */
router.get('/newuser',  function(req, res) {
	res.render('newuser', { title: 'Add New User' });
});

module.exports = router;
