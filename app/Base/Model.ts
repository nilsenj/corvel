import {Inject, Container} from "typedi";
import {Repository} from "../Concretes/Repository";
export abstract class Model{
    public schema;
    public model;
    constructor(schema) {
        this.schema = schema;
    }
    abstract build();
}