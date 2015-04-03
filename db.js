var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Point = new Schema({
    action: String,
    score: Number,
    status: String,
    updateTime: String
});

var Person = new Schema({
    name: String,
    point: [Point]
});

mongoose.model('person', Person);
mongoose.connect('mongodb://localhost/standing');
