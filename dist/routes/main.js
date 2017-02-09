"use strict";
const express = require("express");
const HeroRouter_1 = require("./HeroRouter");
const router = express.Router();
class mainRouter {
    constructor() {
        this.router = router;
    }
    /**
     * @param express
     */
    run(express) {
        // placeholder route handler
        this.router.get("/", (req, res, next) => {
            res.json({
                message: "Hello Bitch!"
            });
        });
        express.use("/", this.router);
        express.use("/api/v1/heroes", HeroRouter_1.HeroRouter);
    }
}
exports.mainRouter = mainRouter;
