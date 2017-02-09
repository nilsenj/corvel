import { Router, Request, Response, NextFunction } from "express";

export class IndexRouter {
    router: Router;
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }
    index(req: Request, res: Response, next: NextFunction) {
        res.render('index', { title: 'Express' });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get("/", this.index);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const indexRoutes = new IndexRouter();
indexRoutes.init();

export default indexRoutes.router;