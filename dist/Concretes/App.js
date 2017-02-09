"use strict";
const path = require("path");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const favicon = require("express-favicon");
const methodOverride = require("method-override");
const view_engine_1 = require("../configs/view-engine");
const main_1 = require("../routes/main");
// Creates and configures an ExpressJS web server.
class App {
    // Run configuration methods on the Express instance.
    constructor() {
        this.express = express();
        this.mainRouter = new main_1.mainRouter();
        this.middleware();
        this.routes();
        this.setViewEngine();
    }
    // Configure Express middleware.
    middleware() {
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
    setViewEngine() {
        // view engine setup
        this.express.set('views', view_engine_1.viewEngineConfig.viewPath);
        this.express.set('view engine', view_engine_1.viewEngineConfig.viewEngine);
    }
    // Configure API endpoints.
    routes() {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        this.mainRouter.run(this.express);
    }
}
exports.App = App;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new App().express;
