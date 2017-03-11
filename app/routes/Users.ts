import {Router, Request, Response, NextFunction} from "express";
import {BaseRouter} from "../Base/BaseRouter";

export class Users extends BaseRouter {

    /**
     * specify the list of
     * endpoints here
     */
    public run() {
        console.log("[Users::run] Creating index route.");
        const prefix = "/users";
        let _this = this;

        //log
        //add home page route
        this.router.get(prefix + "/hello", (req: Request, res: Response, next: NextFunction) => {
            _this.controller.index(req, res, next);
        });
        /* params _this.controller.router level */
        this.router.param('user_id', function (req, res, next, user_id) {
            if (/^\d+$/.test(user_id)) {
                next();
            } else {
                next('route');
            }
        });

        this.router.get(prefix + '/', function (req, res, next) {
            _this.controller.list(req, res, next);
        });

        this.router.get(prefix + '/count', function (req, res, next) {
            _this.controller.count(req, res, next);
        });

        this.router.get(prefix + '/new', function (req, res, next) {
            _this.controller.empty(req, res, next);
        });


        this.router.get(prefix + '/:user_id', function (req, res, next) {
            _this.controller.show(req, res, next);
        });

        this.router.put(prefix + '/:user_id', function (req, res, next) {
            _this.controller.update(req, res, next);
        });

        this.router.post(prefix + '/', function (req, res, next) {
            _this.controller.create(req, res, next);
        });

        this.router.delete(prefix + '/:user_id', function (req, res, next) {
            _this.controller.destroy(req, res, next);
        });

        this.router.delete(prefix + '/truncate', function (req, res, next) {
            _this.controller.truncate(req, res, next);
        });
    }

}