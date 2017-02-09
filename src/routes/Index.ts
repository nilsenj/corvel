import { Router, Request, Response, NextFunction } from "express";
import { BaseRouter } from "../Base/BaseRouter";

export class IndexRouter extends BaseRouter {

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    public static run(router: Router) {
        //log
        console.log("[IndexRoute::create] Creating index route.");

        //add home page route
        router.get("/home", (req: Request, res: Response, next: NextFunction) => {
            new IndexRouter().index(req, res, next);
        });
    }

    /**
     * @param req
     * @param res
     * @param next
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "Home";

        //set options
        let options: Object = {
            "message": "home page"
        };

        //render template
        this.render(req, res, "index", options);
    }
}