import { Router, Request, Response, NextFunction } from "express";
import { BaseRouter } from "../Base/BaseRouter";

export class UsersRouter extends  BaseRouter {

    /**
     * Constructor
     *
     * @class IndexRoute
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * specify the list of
     * endpoints here
     * @param router
     */
    public static run(router: Router) {
        //log
        console.log("[UsersRouter::create] Creating index route.");

        //add home page route
        router.get("/users", (req: Request, res: Response, next: NextFunction) => {
            new UsersRouter().index(req, res, next);
        });
    }
    /**
     * @param req
     * @param res
     * @param next
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "I am user";

        //set options
        let options: Object = {
            "message": ""
        };

        //render template
        this.render(req, res, "index", options);
    }
}