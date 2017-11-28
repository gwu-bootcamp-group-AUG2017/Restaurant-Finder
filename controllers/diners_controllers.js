// Node Dependencies
var express = require('express');
var router = express.Router();
var diner = require('../models/diners.js');


// Create routes
// ----------------------------------------------------
// Index Redirect
router.get('/', function (req, res) {
  res.redirect('/index');
});


// Index Page (render all burgers to DOM)
router.get('/index', function (req, res) {
  diner.selectAll(function(data) {
    var hbsObject = { diners: data };
    //console.log(hbsObject);
    res.render('index', hbsObject);
  });
});


// Create a New Burger
router.post('/diner/create', function (req, res) {
  diner.insertOne(req.body.name, req.body.email, req.body.price,  req.body.type, function() {
    res.redirect('/index');
  });
});


// Devour a Burger
router.post('/diner/update/:id', function (req, res) {
 diner.updateOne(req.params.id,  req.body.type, req.body.price, function() {
   res.redirect('/index');
  });
});
// ----------------------------------------------------


// Export routes
module.exports = router;