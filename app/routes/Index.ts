import { Router, Request, Response, NextFunction } from "express";
import { BaseRouter } from "../Base/BaseRouter";

export class Index extends BaseRouter {

    public run() {
        let _this = this;
        //add home page route
        this.router.get("/home", function(req, res, next) {
            _this.controller.home(req, res, next);
        });
    }
}