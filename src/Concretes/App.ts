import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import  * as favicon from "express-favicon";
import * as methodOverride from "method-override";
import { IApp } from "../Interfaces/IApp";
import { viewEngineConfig } from "../configs/view-engine";
import { mainRouter } from "../routes/router";
import { imainRouter } from "../Interfaces/imainRouter";
import { ModelsResolver } from "./ModelsResolver";
import _ = require('underscore');
import boom = require('boom');
import {ErrorHandlers} from "./ErrorHandlers";

/**
 * Creates and configures an ExpressJS web server.
 */
export class App implements IApp {

    /**
     * ref to Express instance and App addons
     */
    public app: any;
    public mainRouter: imainRouter;

    /**
     * Run configuration methods on the app instance.
     */
    constructor() {
        this.app = express();
        this.basicSetup();
        this.middleware();
        this.setUpModels();
        this.routes();
        this.setViewEngine();
        this.setErrorHandlers();
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
        this.app.use(logger("dev")); //
        this.app.use(bodyParser.json()); // parsing pages
        this.app.use(methodOverride()); // support for put and delete
        this.app.use(bodyParser.urlencoded({extended: false}));
        this.app.use(cookieParser()); // cookie management
        this.app.use("/public", favicon(__dirname+"/../.." + '/favicon.ico')); // giving favicon
        this.app.use("/public", express.static(path.join(__dirname+"/../..", "/public"))); // giving styles and static from public folder
        this.app.use("/files", express.static(path.join(__dirname+"/../..", "/files"))); // giving files
    }

    private setViewEngine(): void {
        // view engine setup
        this.app.set('views', viewEngineConfig[viewEngineConfig.defaultView].viewPath);
        this.app.set('view engine', viewEngineConfig[viewEngineConfig.defaultView].viewEngine);
    }

    /**
     *
     */
    private setErrorHandlers(): void {
        let errorHandler = new ErrorHandlers(this.app);
        errorHandler.run();
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
        this.mainRouter = new mainRouter(this.app);
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        this.mainRouter.run();
    }
}
export default new App().app;