module.exports = function(config) {
    var express = require('express');
    var mongoose = require('mongoose');

    mongoose.connect(config.mongoConnection);
    var Todo = require('./models/todo');

    var index = require('./routes/index');

    var app = express();

    var path = require('path');
    // view engine setup
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');

    //set up boilerplate middleware
    app.use(require('./middleware/boilerplate'));

    //set up routes
    app.use('/', index);

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            err.message = "No Authorization Token Found";
        }
        next(err);
    });

    //set up error handler
    app.use(require('./middleware/error404'));

    app.use(function(err, req, res, next) {
        console.log('Error Caught');
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        if(req.accepts("text/html")) {
            res.status(err.status || 500);
            res.render('error');
        } else {
            res.sendStatus(err.status || 500);
        }
    });

    return app;
};