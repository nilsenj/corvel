import * as e from "express";

import Request = e.Request;
import Response = e.Response;

export class ErrorHandlers {

    private app;

    constructor(app) {
        this.app = app;
        this.run();
    }

    run() {
        function errorHandler(err, req, res, next) {
            if (res.headersSent) {
                return next(err);
            }
            res.status(500);
            res.render('error', { error: err });
        }

        // catch 404 and forward to error handler
        this.app.use((req: Request, res: Response, next: Function) => {
            let err: any = new Error('Not Found');
            err.status = 404;
            next(err);
        });

        // error handlers
        // development error handler
        // will print stacktrace
        if (this.app.get('env') === 'development') {
            this.app.use(function (err: any, req: Request, res: Response, next: Function) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        this.app.use(function (err: any, req: Request, res: Response, next: Function) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
}
