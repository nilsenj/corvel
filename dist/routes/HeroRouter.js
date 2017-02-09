"use strict";
const express_1 = require("express");
const data_1 = require("../data");
class HeroRouter {
    /**
     * Initialize the HeroRouter
     */
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    /**
     * GET all Heroes.
     */
    getAll(req, res, next) {
        res.send(data_1.Heroes);
    }
    /**
     * Take each handler, and attach to one of the Express.Router's
     * endpoints.
     */
    init() {
        this.router.get("/", this.getAll);
    }
}
exports.HeroRouter = HeroRouter;
// Create the HeroRouter, and export its configured Express.Router
const heroRoutes = new HeroRouter();
heroRoutes.init();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = heroRoutes.router;
