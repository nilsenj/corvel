import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
const favicon = require("express-favicon");
import * as methodOverride from "method-override";
import {ICore} from "../Interfaces/ICore";
import {viewEngineConfig} from "../configs/view-engine";
import {MainRouter} from "../routes/MainRouter";
import {iMainRouter} from "../Interfaces/iMainRouter";
import {ModelsResolver} from "../Core/Resolvers/ModelsResolver";
import {ControllersResolver} from "../Core/Resolvers/ControllersResolver";
import {_, boom} from '../configs/constants';
const router = express.Router();
const notifier = require('node-notifier');
import Request = express.Request;
import Response = express.Response;
const useragent = require('express-useragent');
import {Container, Service, Inject} from "typedi";
import {Application} from "./Application";
import { TestInterceptor } from '../Interceptors/test';
import morgan = require("morgan");

/**
 * Creates and configures an ExpressJS web server.
 */
@Service('Core')
export class Core implements ICore {

    /**
     * ref to Express instance and App addons
     */
    @Inject("core.app")
    public app: any;
    protected router;
    public MainRouter: iMainRouter;
    public controllers = [];

    /**
     * Run configuration methods on the app instance.
     */
        constructor(@Inject("core.app") app: Application) {
        this.app = app;
        this.router = router;
        this.basicSetup();
        this.middleware();
        this.interceptors();
        this.setUpModels();
        this.setUpControllers();
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
        this.app.use(useragent.express());
        this.app.use(morgan('dev')); // parsing pages
        this.app.use(bodyParser.json()); // parsing pages
        this.app.use(methodOverride()); // support for put and delete
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser()); // cookie management
        this.app.use(favicon(__dirname + "/../.." + '/public/favicon.ico')); // giving favicon
        this.app.use("/public", express.static(path.join(__dirname + "/../..", "/public"))); // giving styles and static from public folder
        this.app.use("/files", express.static(path.join(__dirname + "/../..", "/files"))); // giving files
    }

    private interceptors(): void {
        this.app.use(TestInterceptor);
    }

    private setViewEngine(): void {
        // view engine setup
        this.app.set('views', viewEngineConfig[viewEngineConfig.defaultView].viewPath);
        this.app.set('view engine', viewEngineConfig[viewEngineConfig.defaultView].viewEngine);
        this.app.engine(viewEngineConfig[viewEngineConfig.defaultView].viewEngine,
        viewEngineConfig[viewEngineConfig.defaultView].viewResolve);
    }

    private setUpControllers(): void {
        this.app.controllers = ControllersResolver.init(this.app, this.router);
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
        let newApp = resolver.init();
        this.setDb(newApp.orm);
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        this.MainRouter = new MainRouter(this.app, this.router);
    }
    /**
     *
     * @param orm
     */
    private setDb(orm): void {
        this.app.orm = orm;
    }
}
let core = Container.get<Core>("Core");
export default core.app;