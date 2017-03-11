import * as e from "express";

import {BaseController} from "../../Base/BaseController";
import Request = e.Request;
import Response = e.Response;
import NextFunction = e.NextFunction;

export class IndexController extends BaseController {
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