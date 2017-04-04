var express = require('express');
var Todo = require('../models/todo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    Todo.find({},function(err,todos) {
        var todoMap = {};

        todos.forEach(function(todo){
            todoMap[todo._id] = todo.contents;
        });

        req.result = JSON.stringify(todoMap);
        next();
    });
});

router.get('/:id',function (req, res, next) {
    Todo.findOne({_id: req.params.id}, function(err,todo) {
        req.result = JSON.stringify(todo);
        next();
    });
});

router.post('/new',function(req, res, next) {
   var newTodo = new Todo({contents:req.body.contents});
   newTodo.save(function(err){
        if(err) {
            req.result = err.toString();
            next();
        }
   });

   req.result = 'Success';
   next();
});

router.use(function(req, res, next){
    if(req.accepts('html')) {
        res.render('index',{title: 'Todo', json:req.result});
    } else {
        res.send(req.result);
    }
});

module.exports = router;
