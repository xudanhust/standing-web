require('./db');

var app        = require('express')();
var bodyParser = require('body-parser');
var static     = require('serve-static');
var routes     = require('./routes');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
if (app.get('env') === 'development') {
    app.locals.pretty = true;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(static(__dirname + '/public'));
routes(app);

app.listen(app.get('port'));
console.log('Express app started on port ' + app.get('port'));
