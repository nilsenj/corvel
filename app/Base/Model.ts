import {Container, Service, Inject} from "typedi";
let caminte = require('caminte');
let Schema = caminte.Schema;
import {dbConfig} from '../configs/db';
let database = dbConfig[dbConfig.defaultDriver][process.env.NODE_ENV || 'dev'];

export abstract class Model{
    public schema;
    constructor() {
        this.schema = new Schema(database.driver, database);
    }
}