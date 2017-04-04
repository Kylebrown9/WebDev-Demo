/**
 * Created by Admin on 3/21/2017.
 */
module.exports = function(req, res, next) {
    var err = new Error('Resource Not Found');
    err.status = 404;
    next(err);
};

// router.use(function (err, req, res, next) {
//     if (err.name === 'UnauthorizedError') {
//         res.status(401).send('invalid token...');
//     }
// });

// error handler
// router.use(function(err, req, res, next) {
//     console.log('Error Caught');
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     if(req.accepts("text/html")) {
//         res.status(err.status || 500);
//         res.render('error');
//     } else {
//         res.sendStatus(err.status || 500);
//     }
// });