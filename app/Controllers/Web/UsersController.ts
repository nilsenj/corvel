import * as e from "express";

import {BaseController} from "../../Base/BaseController";
import Request = e.Request;
import Response = e.Response;
import NextFunction = e.NextFunction;

export class UsersController extends BaseController {
    /**
     * @param req
     * @param res
     * @param next
     */
    public index(req: Request, res: Response, next: NextFunction) {
        //set custom title
        this.title = "I am user";

        //set options
        let options: Object = {
            "message": ""
        };

        //render template
        this.render(req, res, "index", options);
    }

    /**
     * Show action, returns shows a single user
     * Default mapping to GET '~/users/:id'
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public show(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let User = app.model('User');
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json(app.boom.badRequest(err.message || err).output.payload);
            }
            if (user) {
                res.status(200);
                res.json(user.toObject());
            } else {
                res.status(404);
                res.json(app.boom.notFound('user not found').output.payload);
            }
        });
    }

    /**
     * Index action, returns a list either
     * Default mapping to GET '~/users'
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public list(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let User = app.model('User');

        let query = req.query;
        let skip = query.skip ? parseInt(query.skip) - 1 : 0;
        let limit = query.limit ? parseInt(query.limit) : 20;

        let opts = {
            skip: skip,
            limit: limit,
            where: {}
        };

        delete query.skip;
        delete query.limit;
        // TODO: it needs implementation for search
        app._.extend(opts.where, query);

        User.all(opts, function (err, users) {
            if (err) {
                res.status(400);
                return res.json(app.boom.badRequest(err.message || err).output.payload);
            }
            res.status(200);
            res.json(users);
        });
    }

    /**
     * Count items action, returns amount of user
     * Default mapping to GET '~/users/count'
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public count(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let User = app.model('User');
        let query = req.query;

        let opts = {
            where: {}
        };

        // TODO: it needs implementation
        app._.extend(opts.where, query);

        User.count(opts.where, function (err, count) {
            if (err) {
                res.status(400);
                return res.json(app.boom.badRequest(err.message || err).output.payload);
            }
            res.status(200);
            res.json({
                count: count
            });
        });
    }

    /**
     * New action, returns new a single user
     * Default mapping to GET '~/users/new'
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public empty(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let User = app.model('User');
        let user = new User(req.query);
        res.status(200);
        res.json(user.toObject());
    }

    /**
     * Create action, creates a single user
     * Default mapping to POST '~/users', no GET mapping
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public create(req: Request, res: Response, next: NextFunction) {
        const app = this.app;

        let User = app.model('User');
        let user = new User(req.body);
        user.isValid(function (isValid) {
            if (!isValid) {
                res.status(422);
                let error = app.boom.badData('data is bad you should fix it').output.payload;
                error.attributes = user.errors;
                return res.json(error);
            }
            user.save(function (err) {
                if (err) {
                    res.status(400);
                    return res.json(app.boom.badRequest(err.message || err).output.payload);
                }
                res.status(201);
                res.json(user.toObject());
            });
        });
    }

    /**
     * Update action, updates a single user
     * Default mapping to PUT '~/users/:id', no GET mapping
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public update(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let query = req.body;
        let User = app.model('User');
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json(app.badRequest(err.message || err).output.payload);
            }
            if (user) {

                app._.extend(user, query);

                user.isValid(function (isValid) {
                    if (isValid) {
                        user.updateAttributes(req.body, function (err) {
                            if (err) {
                                res.status(400);
                                return res.json(app.boom.badRequest(err.message || err).output.payload);
                            }
                            res.status(200);
                            res.json(user.toObject());
                        });
                    } else {
                        res.status(422);
                        let error = app.boom.badData('data is bad you should fix it').output.payload;
                        error.attributes = user.errors;
                        return res.json(error);
                    }
                });
            } else {
                res.status(404);
                res.json(app.boom.notFound('user not found').output.payload);
            }
        });
    }

    /**
     * Delete action, deletes a single user
     * Default mapping to DEL '~/users/:id', no GET mapping
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public destroy(req: Request, res: Response, next: NextFunction) {
        const app = this.app;
        let User = app.model('User');
        User.findById(req.params.user_id, function (err, user) {
            if (err) {
                res.status(400);
                return res.json(app.boom.badRequest(err.message || err).output.payload);
            }
            if (!user) {
                res.status(404);
                return res.json(app.boom.notFound('user not found').output.payload);
            }
            user.destroy(function (err) {
                if (err) {
                    res.status(400);
                    return res.json(app.boom.badRequest(err.message || err).output.payload);
                } else {
                    res.status(204);
                    res.json({
                        message: 'users deleted!'
                    });
                }
            });
        });
    }

    /**
     * Delete action, deletes a all users
     * Default mapping to DEL '~/users', no GET mapping
     *
     * @param {Object} req
     * @param {Object} res
     * @param {Function} next
     **/
    public truncate(req: Request, res: Response, next: NextFunction) {
        const app = this.app;

        let User = app.model('User');
        User.destroyAll(function (err) {
            if (err) {
                res.status(400);
                return res.json(app.boom.badRequest(err.message || err).output.payload);
            } else {
                res.status(204);
                res.json({
                    statusCode: 204,
                    message: 'All users deleted'
                });
            }
        });
    }


}