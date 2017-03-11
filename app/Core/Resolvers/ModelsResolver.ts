import Relations from "../../Concretes/Relations";
import * as path from "path";

let caminte = require('caminte');
let Schema = caminte.Schema;
let fs = require('fs');
let modelDir = path.resolve(__dirname, '../../Models');
let modelList = fs.readdirSync(modelDir);
import { dbConfig } from '../../configs/db';
let database = dbConfig[dbConfig.defaultDriver][process.env.NODE_ENV || 'dev'];
let schema = new Schema(database.driver, database);

/**
 *  models loader
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/
declare let require:(moduleId:string) => any;
export class ModelsResolver {

    constructor() {
        this._schema = schema;
    }
    private _schema;
    public relationsList: any;
    init(app) {

        if(!app.models) {
            app.models = {};
        }

        let count = modelList.length;
        for(let m = 0; m < modelList.length; m++) {
            let modelFile = modelList[m];
            if (/Model\.js$/i.test(modelFile)) {
                let modelName = modelFile.replace(/\.js$/i, '');
                let modules = require('auto-loader').load(modelDir + '\\');
                for (let module in modules) {
                    app.models[module] = new modules[modelName][modelName](schema).model(); //
                }
                if(--count === 0) {
                    this.relations(null);
                }
            }
        }
        if ('function' === typeof  this._schema.autoupdate) {
            if (process.env.AUTOUPDATE) {
                this._schema.autoupdate(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            }
        }
        app.orm = caminte;
        app.orm.schema = this._schema;
        app.orm.schema.models = app.models;
        return app;
    }
    relations(models) {
        let relations = new Relations();
        relations.load(models);
        this.setRelations(relations.getRelations());
    }

    getRelations() {
        return this.relationsList;
    }

    setRelations(relation) {
        return this.relationsList = relation;
    }

}

