import * as express from "express";
import { imainRouter } from "../Interfaces/imainRouter";
import { UsersRouter } from "./Users";
import {IndexRouter} from "./Index";
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

        express.use("/", this.router);

        // placeholder route handler
        this.router.get("/", (req, res, next) => {
            res.json({
                message: "Welcome to Corvel!"
            });
        });

        IndexRouter.run(this.router);
        UsersRouter.run(this.router);
    }
}