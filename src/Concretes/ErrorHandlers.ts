import errorHandler = require('express-error-handler');

export class ErrorHandlers {

    private app;
    constructor(app) {
        this.app = app;
    }
    run() {
        let handler;

        handler = errorHandler({
            handlers: {
                '404': function err404() {
                    // do some custom thing here...
                    return "Not found";
                }
            }
        });

        // Handle all unhandled errors:
        this.app.use(handler);

        let staticHandler = errorHandler({
            static: {
                '404': function err404() {
                    // do some custom thing here...
                    return console.log("Static Not found");
                }
            }
        });
        this.app.use(staticHandler);


        let viewsHandler = errorHandler({
            views: {
                '404': function err404() {
                    // do some custom thing here...
                    console.log("View Not found");
                    return "Not found";
                }
            }
        });
        this.app.use(viewsHandler);


        let jsonHandler = errorHandler({
            serializer: function (err) {
                let body = {
                    status: err.status,
                    message: err.message
                };
                if (createHandler.isClientError(err.status)) {
                    ['code', 'name', 'type', 'details'].forEach(function (prop) {
                        if (err[prop]) body[prop] = err[prop];
                    });
                }
                return body;
            }
        });
        this.app.use(jsonHandler);

    }
}
