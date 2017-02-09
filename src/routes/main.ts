import * as express from "express";
import {HeroRouter} from "./HeroRouter";
import {imainRouter} from "../Interfaces/imainRouter";
const router = express.Router();

export class mainRouter implements imainRouter {
    protected router;

    constructor() {
        this.router = router;
    }

    /**
     * @param express
     */
    run(express) {

        // placeholder route handler
        this.router.get("/", (req, res, next) => {
            res.json({
                message: "Hello Bitch!"
            });
        });
        express.use("/", this.router);
        express.use("/api/v1/heroes", HeroRouter);
    }
}