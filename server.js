// @author: Dream Team
// @github: https://github.com/gwu-bootcamp-group-AUG2017/Restaurant-Finder
// @comment: Project2 - Restaurant-Finder


// Node Dependencies

var express = require('express');

var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();
// require('express-helpers')(app);
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));


// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Handlebars
var exphbs = require('express-handlebars');



var hbs = exphbs.create({
    helpers: {select: function(selected, options) {return options.fn(this).replace(
        new RegExp(' value=\"' + selected + '\"'),
        '$& selected="selected"')}},
     defaultLayout: 'main'
       
});


app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

var router = require('./controllers/diners_controllers.js');
app.use('/', router);

// Open Server
var port = process.env.PORT || 3000;
app.listen(port);

