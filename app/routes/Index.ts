import { BaseRouter } from "../Base/BaseRouter";
import {Container, Service} from "typedi";

@Service('route.index')
export class Index extends BaseRouter {
    public routes() {
        let _this = this;
        //add home page route
        this.router.get("/home", function(req, res, next) {
            _this.controller.home(req, res, next);
        });
    }
}