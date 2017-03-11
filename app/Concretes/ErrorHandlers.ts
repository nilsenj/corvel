import errorHandler = require('express-error-handler');

export class ErrorHandlers {

    private app;

    constructor(app) {
        this.app = app;
    }

    run() {
        function errorHandler(err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }
            res.status(500);
            res.render('error', { error: err });
        }
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use(function (err, req, res, next) {

                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        this.app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
}
