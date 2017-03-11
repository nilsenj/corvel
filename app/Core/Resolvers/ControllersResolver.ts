import {Router, Request, Response, NextFunction} from "express";
import * as express from "express";
let fs = require('fs');
import * as path from "path";
let controllerDir = path.resolve(__dirname, '../../../dist/Controllers/Web/');
let controllerList = fs.readdirSync(controllerDir);

declare let require: (moduleId: string) => any;
export class ControllersResolver {
    public static init(app, router) {

        if (!app.controllers) {
            app.controllers = {};
        }
        for (let m = 0; m < controllerList.length; m++) {
            let controllerFile = controllerList[m];
            let controllerName = controllerFile.replace(/\.js$/i, '');
            let controllers = require('auto-loader').load(controllerDir + '\\');
            for (let controller in controllers) {
                if (app.controllers[controller] !== controllers[controller]) {
                    app.controllers[controller] = (new controllers[controllerName][controllerName](router, app));
                }
            }
        }
        return app.controllers;
    }
}