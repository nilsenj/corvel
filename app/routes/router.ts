import {imainRouter} from "../Interfaces/imainRouter";
import {Users} from "./Users";
import {Index} from "./Index";
import {ErrorHandlers} from "../Concretes/ErrorHandlers";
export class mainRouter implements imainRouter {
    protected router;
    protected app;

    /**
     *
     * @param app
     * @param router
     */
    constructor(app, router) {
        this.app = app;
        this.router = router;
    }

    /**
     * run routes functionality
     */
    run() {

        this.app.use("/", this.router);
        // placeholder route handler
        this.router.get("/corvel", (req, res, next) => {
            res.json({
                message: "Welcome to Corvel!"
            });
        });
        /**
         * please specify routes here
         */
        let index = new Index(this.router, this.app);
        index.run();
        let users = new Users(this.router, this.app);
        users.run();
        let errorHandler = new ErrorHandlers(this.app);
        errorHandler.run();
    }
}