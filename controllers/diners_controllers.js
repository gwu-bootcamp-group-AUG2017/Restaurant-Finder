// Node Dependencies
var express = require('express');
var router = express.Router();
var diner = require('../models/diners.js');
//var request = require('request');
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
  diner.insertOne(req.body.name, req.body.location, req.body.price,  function() {
  	
    res.redirect('/index');
  });
});

 
// Export routes
module.exports = router;