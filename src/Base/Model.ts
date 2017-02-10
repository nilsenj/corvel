/**
 *  models loader
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/
let caminte = require('caminte');

export abstract class Model {

    public schema;
    constructor(schema) {
        this.schema = schema;
    }
    abstract model();
}

