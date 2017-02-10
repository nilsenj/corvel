import { Router, Request, Response, NextFunction } from "express";
import { BaseRouter } from "../Base/BaseRouter";

export class IndexRouter extends BaseRouter {

    public run() {
        //log
        console.log("[IndexRoute::run] Creating index route.");
        //add home page route
        this.router.get("/home", (req: Request, res: Response, next: NextFunction) => {
            console.log(this.app);
           this.index(req, res, next);
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