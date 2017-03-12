import Relations from "../../Concretes/Relations";
import * as path from "path";

let caminte = require('caminte');
let Schema = caminte.Schema;
let fs = require('fs');
let modelDir = path.resolve(__dirname, '../../Models');
let modelList = fs.readdirSync(modelDir);
import {dbConfig} from '../../configs/db';
import {Application} from "../../Concretes/Application";
import {Inject, Container, Service} from "typedi";
let database = dbConfig[dbConfig.defaultDriver][process.env.NODE_ENV || 'dev'];
let schema = new Schema(database.driver, database);

/**
 *  models loader
 **/
declare let require: (moduleId: string) => any;
@Service('ModelsResolver')
export class ModelsResolver {
    @Inject("core.app")
    public app: Application;
    constructor() {
        this._schema = schema;
    }

    private _schema;
    public relationsList: any;

    init() {
        let models = {};
        let count = modelList.length;
        for (let m = 0; m < modelList.length; m++) {
            let modelFile = modelList[m];
            if (/\.js$/i.test(modelFile)) {
                let modules = require('auto-loader').load(modelDir + '\\');
                for (let module in modules) {
                    models[module] = new modules[module][module](schema).setUp(); //
                }
                if (--count === 0) {
                    this.relations(null);
                }
            }
        }
        if ('function' === typeof  this._schema.autoupdate) {
            if (process.env.AUTOUPDATE) {
                this._schema.autoupdate(function (err) {
                    if (err) {
                        console.error(err);
                    }
                });
            }
        }
        return this.appModelBindings(this.app, models);
    }

    public relations(models) {
        let relations = new Relations();
        relations.load(models);
        this.setRelations(relations.getRelations());
    }

    private appModelBindings(app, models) {
        app.orm = caminte;
        app.orm.schema = this._schema;
        app.orm.schema.models = models;
        app.model = (name) => {
            return app.orm.schema.models[name];
        };
        app.orm.model = (name) => {
            return app.orm.schema.models[name];
        };
        return app;
    }
    private getRelations() {
        return this.relationsList;
    }

    private setRelations(relation) {
        return this.relationsList = relation;
    }

}
let modelsResolver = Container.get<ModelsResolver>("ModelsResolver");
export default modelsResolver;
