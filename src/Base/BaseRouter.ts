import { Router, Request, Response, NextFunction } from "express";
export abstract class BaseRouter {
    protected title: string;
    private scripts: string[];
    /**
     * Constructor
     *
     * @class BaseRoute
     * @constructor
     */
    constructor() {
        //initialize variables
        this.title = "corvel";
        this.scripts = [];
    }

    public static run(router: Router)
    {
        console.log("Please specify run method!" + self);
    };

    /**
     * Add a JS external file to the request.
     *
     * @class BaseRoute
     * @method addScript
     * @param src {string} The src to the external JS file.
     * @return {BaseRoute} Self for chaining
     */
    public addScript(src: string): BaseRouter {
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