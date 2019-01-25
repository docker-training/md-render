var express = require('express');
var exphbs  = require('express-handlebars');
var path    = require('path');

var router  = require('./router');
var errorHandler = require('./errorHandler');

var app = express();
app.engine('hbs', exphbs({defaultLayout: 'default', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler); //TODO: fix error handler
app.use('/', router);

app.listen(8080, function(){
    console.log("listing on 8080")
})
