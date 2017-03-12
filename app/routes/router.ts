import {iMainRouter} from "../Interfaces/iMainRouter";
import Uploader = require('express-uploader');
import {routes} from "../routes";

export class MainRouter implements iMainRouter {

    protected router;
    protected app;

    /**
     *
     * @param app
     * @param router
     */
    constructor(app, router) {
        this.app = app;
        this.router = router;
        this.run();
    }

    /**
     * run routes functionality
     */
    public run(): void {
        this.predefined();
        for (let route in routes) {
            new (routes[route])(this.router, this.app);
        }
    }

    /**
     * get the predefined route configs
     */
    private predefined(): void {
        this.app.use("/", this.router);
        this.app.all('/files/upload', function (req, res, next) {
            let uploader = new Uploader({
                debug: true,
                validate: true,
                thumbnails: true,
                thumbToSubDir: true,
                tmpDir: __dirname + '/tmp',
                publicDir: __dirname + '/../../public',
                uploadDir: __dirname + '/../../public/files',
                uploadUrl: '/../../files/',
                thumbSizes: [140, [100, 100]]
            });
            uploader.uploadFile(req, function (data) {
                res.send(JSON.stringify(data), {'Content-Type': 'text/plain'}, 200);
            });
        });
    }
}