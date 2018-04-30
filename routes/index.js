var express = require('express');
var router = express.Router();

/* GET home page. */
// Handles node requests for node's "Home" page, '/', renders index
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/*  GET Hello World page. */
// Handles node requests for helloworld subpage, '/', renders helloworld
router.get('/helloworld', function(req, res)  {
	res.render('helloworld', {title: 'Hello, World! This is Doug & Janusz' });
});

/* the GET Userlist page  */
// Handles node requests for userlist page,
// retrieves Mongo db collection, 
// renders userlist template passing object with data 
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
// simple data-input page with submit button
router.get('/newuser',  function(req, res) {
	res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
// (Writer of article commented this section well enough.)
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('Usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

// Make changes in router available
module.exports = router;
