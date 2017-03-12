export abstract class Model{

    public schema;
    constructor(schema) {
        this.schema = schema;
    }
    abstract model();
}

