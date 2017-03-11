import { Request, Response, NextFunction } from 'express';
import { BaseController } from '../../Base/BaseController';
import helpers from '../../helpers/index';

export class IndexController extends BaseController {
    constructor(router, app) {
        super(router, app);
    }

    public home(req, res, next) {
        console.log("Home is here");
        //set custom title
        let title = "Home";
        //set options
        let options: Object = {
            "message": "home page"
        };
        //render template
        this.render(req, res, "index", options);
    }
}