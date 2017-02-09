import { Router, Request, Response, NextFunction } from "express";
import { Heroes } from '../data';

export class HeroRouter {
    router: Router;
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = Router();
        this.init();
    }

    /**
     * GET all Heroes.
     */
    getAll(req: Request, res: Response, next: NextFunction) {
        res.send(Heroes);
    }

    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get("/", this.getAll);
    }

}

// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();

export default heroRoutes.router;