import {Container, Service, Inject} from "typedi";
import {IApplication} from "../Interfaces/IApplication";
import * as express from 'express';

@Service("core.app")
export class Application extends express implements IApplication {

    constructor() {
        super();
    }
}