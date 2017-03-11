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
        let controllers = require('auto-loader').load(controllerDir + '\\');
        for (let controller in controllers) {
            app.controllers[controller] = (new controllers[controller][controller](router, app));
        }
        return app.controllers;
    }
}