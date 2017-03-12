import { BaseRouter } from "../Base/BaseRouter";

export class Index extends BaseRouter {
    public routes() {
        let _this = this;
        //add home page route
        this.router.get("/home", function(req, res, next) {
            _this.controller.home(req, res, next);
        });
    }
}