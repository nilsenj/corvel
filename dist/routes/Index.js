"use strict";
const express_1 = require("express");
class IndexRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    index(req, res, next) {
        res.render('index', { title: 'Express' });
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get("/", this.index);
    }
}
exports.IndexRouter = IndexRouter;
// Create the HeroRouter, and export its configured Express.Router
const indexRoutes = new IndexRouter();
indexRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = indexRoutes.router;
