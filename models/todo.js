/**
 * Created by Admin on 4/3/2017.
 */
var mongoose = require('mongoose');

var todoSchema = new mongoose.Schema({
    contents : String
});

module.exports = mongoose.model('todo',todoSchema);
