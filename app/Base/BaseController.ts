import helpers from '../helpers/index';
import * as express from "express";
import Response = express.Response;
import Request = express.Request;
import {Inject} from "typedi";
import {Application} from "../Concretes/Application";

export abstract class BaseController {
    protected router;
    @Inject("core.app")
    protected app;
    public helpers;
    protected scripts: string[];
    protected title: string;

    constructor(router, @Inject("core.app") app: Application) {
        this.router = router;
        this.app = app;
        this.helpers = helpers;
        this.scripts = [];
        this.title = "corvel";

    }

    public getClassName() {
        return (<any>this).constructor.name;
        // OR return (this as any).constructor.name;
    }
    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string) {
        this.scripts.push(src);
        return this;
    }

    /**
     * Render a page.
     *
     * @class BaseRoute
     * @method render
     * @param req {Request} The request object.
     * @param res {Response} The response object.
     * @param view {String} The view to render.
     * @param options {Object} Additional options to append to the view's local scope.
     * @return void
     */
    public render(req: Request, res: Response, view: string, options?: Object) {
        //add constants
        res.locals.BASE_URL = "/";

        //add scripts
        res.locals.scripts = this.scripts;

        //add title
        res.locals.title = this.title;

        //render view
        res.render(view, options);
    }
}