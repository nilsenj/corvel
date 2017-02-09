import * as path from "path";
import * as express from "express";
import * as logger from "morgan";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import  * as favicon from "express-favicon";
import * as methodOverride from "method-override";
import { IApp } from "../Interfaces/IApp";
import { viewEngineConfig } from "../configs/view-engine";
import { mainRouter } from "../routes/main";
import { imainRouter } from "../Interfaces/imainRouter";

// Creates and configures an ExpressJS web server.
export class App implements IApp {

    // ref to Express instance
    public express: express.Application;
    public mainRouter: imainRouter;

    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.mainRouter = new mainRouter();
        this.middleware();
        this.routes();
        this.setViewEngine();
    }

    // Configure Express middleware.
    private middleware(): void {
        this.express.use(logger("dev"));
        this.express.use(bodyParser.json());
        this.express.use(methodOverride()); // поддержка put и delete
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());
        this.express.use(require('node-sass-middleware')({
            src: path.join(__dirname, 'public'),
            dest: path.join(__dirname, 'public'),
            indentedSyntax: true,
            sourceMap: true
        }));
        this.express.use(favicon(__dirname + '/public/favicon.ico')); // отдаем стандартную фавиконку, можем здесь же свою задать
        this.express.use(express.static(path.join(__dirname, "public")));
    }

    private setViewEngine(): void {
        // view engine setup
        this.express.set('views', viewEngineConfig.viewPath);
        this.express.set('view engine', viewEngineConfig.viewEngine);
    }

    // Configure API endpoints.
    private routes(): void {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        this.mainRouter.run(this.express);
    }
}
export default new App().express;