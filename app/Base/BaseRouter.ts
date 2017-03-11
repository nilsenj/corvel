import {Router, Request, Response, NextFunction} from "express";
import * as express from "express";
let fs = require('fs');
import * as path from "path";
let controllerDir = path.resolve(__dirname, '../../dist/Controllers/Web/');
let controllerList = fs.readdirSync(controllerDir);

export abstract class BaseRouter {

    protected router;
    public app;
    public controller;

    constructor(router, app) {
        this.router = router;
        this.app = app;
        this.controller = app.controller(this.getClassName()+"Controller");
    }

    public getClassName() {
        return (<any>this).constructor.name;
        // OR return (this as any).constructor.name;
    }

    public run() {
        console.log("Please specify run method!" + self);

    };
}