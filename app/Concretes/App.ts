import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as favicon from "express-favicon";
import * as methodOverride from "method-override";
import {IApp} from "../Interfaces/IApp";
import {viewEngineConfig} from "../configs/view-engine";
import {mainRouter} from "../routes/router";
import {imainRouter} from "../Interfaces/imainRouter";
import {ModelsResolver} from "../Core/Resolvers/ModelsResolver";
import {ControllersResolver} from "../Core/Resolvers/ControllersResolver";
import {ErrorHandlers} from "./ErrorHandlers";
import {_, boom} from '../configs/constants';
const router = express.Router();
import errorhandler = require('errorhandler')
import notifier = require('node-notifier');
import Request = express.Request;
import Response = express.Response;
/**
 * Creates and configures an ExpressJS web server.
 */
export class App implements IApp {

    /**
     * ref to Express instance and App addons
     */
    public app: any;
    protected router;
    public mainRouter: imainRouter;
    public controllers = [];

    /**
     * Run configuration methods on the app instance.
     */
    constructor() {
        this.app = express();
        this.router = router;
        this.basicSetup();
        this.middleware();
        this.setUpControllers();
        this.setUpModels();
        this.routes();
        this.setViewEngine();
    }

    /**
     * setup basic libraries
     */
    private basicSetup() {
        this.app._ = _;
        this.app.boom = boom;
    }

    // Configure app middleware.
    private middleware(): void {
        this.app.use(logger("dev"));
        this.app.use(function (req, res, next) {
            res.removeHeader("X-Powered-By");
            res.setHeader('X-Powered-By', 'Corvel Framework');
            next();
        });
        this.app.use(bodyParser.json()); // parsing pages
        this.app.use(methodOverride()); // support for put and delete
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser()); // cookie management
        this.app.use(favicon(__dirname + "/../.." + '/public/favicon.ico')); // giving favicon
        this.app.use("/public", express.static(path.join(__dirname + "/../..", "/public"))); // giving styles and static from public folder
        this.app.use("/files", express.static(path.join(__dirname + "/../..", "/files"))); // giving files
    }

    private setViewEngine(): void {
        // view engine setup
        this.app.set('views', viewEngineConfig[viewEngineConfig.defaultView].viewPath);
        this.app.set('view engine', viewEngineConfig[viewEngineConfig.defaultView].viewEngine);

    }

    private setUpControllers(): void {
        let resolver = new ControllersResolver();
        this.app.controllers = resolver.init(this.app, this.router);
        this.app.controller = (name) => {
            // process.env.AUTOUPDATE = true;
            return this.app.controllers[name];
        };
    }

    /**
     * set up models and orm
     * functionality
     */
    private setUpModels(): void {
        let resolver = new ModelsResolver();
        let newApp = resolver.init(this.app);
        this.setDb(newApp.orm);
    }

    // Configure API endpoints.
    private routes(): void {
        this.mainRouter = new mainRouter(this.app, this.router);
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        this.mainRouter.run();
        // development error handler
        // will print stacktrace

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

    /**
     *
     * @param orm
     */
    private setDb(orm): void {
        this.app.orm = orm;
        this.app.orm.model = (name) => {
            // process.env.AUTOUPDATE = true;
            return this.app.orm.schema.models[name];
        };
    }

    /**
     *
     */
    private setErrorHandlers(): void {
        let errorHandler = new ErrorHandlers(this.app);
        errorHandler.run();
    }
}
export default new App().app;