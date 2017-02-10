import { imainRouter } from "../Interfaces/imainRouter";
import { UsersRouter } from "./Users";
import { IndexRouter } from "./Index";
import * as express from "express";
const router = express.Router();

export class mainRouter implements imainRouter {
    protected router;
    protected app;

    /**
     * @param app
     */
    constructor(app) {
        this.app = app;
        this.router = router;
    }

    /**
     * run routes functionality
     */
    run() {

        this.app.use("/", this.router);

        // placeholder route handler
        this.router.get("/", (req, res, next) => {
            res.json({
                message: "Welcome to Corvel!"
            });
        });
        /**
         * please specify routes here
         */
        let index = new IndexRouter(this.router, this.app);
        index.run();
        let users = new UsersRouter(this.router, this.app);
        users.run();
    }
}