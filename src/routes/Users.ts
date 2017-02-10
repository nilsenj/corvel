import { Router, Request, Response, NextFunction } from "express";
import { BaseRouter } from "../Base/BaseRouter";

export class UsersRouter extends  BaseRouter {

    /**
     * specify the list of
     * endpoints here
     */
    public run() {
        console.log("[UsersRouter::run] Creating index route.");

        const app = this.app;
        const User = app.orm.schema.models.UserModel;
        //log
        //add home page route
        this.router.get("/users", (req: Request, res: Response, next: NextFunction) => {
            this.index(req, res, next);
        });
        /* params this.router level */
        this.router.param('user_id', function (req, res, next, user_id) {
            if (/^\d+$/.test(user_id)) {
                next();
            } else {
                next('route');
            }
        });

        /**
         * Index action, returns a list either
         * Default mapping to GET '~/users'
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function list(req, res) {
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

        this.router.get('/user_list', list);

        /**
         * Count items action, returns amount of user
         * Default mapping to GET '~/users/count'
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function count(req, res) {
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
                res.status( 200 );
                res.json( {
                    count: count
                });
            });
        }

        this.router.get('/count', count);

        /**
         * New action, returns new a single user
         * Default mapping to GET '~/users/new'
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function empty(req, res) {
            let user = new User(req.query);
            res.status(200);
            res.json(user.toObject());
        }

        this.router.get('/new', empty);

        /**
         * Show action, returns shows a single user
         * Default mapping to GET '~/users/:id'
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function show(req, res) {
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

        this.router.get('/:user_id', show);

        /**
         * Update action, updates a single user
         * Default mapping to PUT '~/users/:id', no GET mapping
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function update(req, res) {
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
                        if(isValid) {
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

        this.router.put('/:user_id', update);

        /**
         * Create action, creates a single user
         * Default mapping to POST '~/users', no GET mapping
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function create(req, res) {
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

        this.router.post('/', create);

        /**
         * Delete action, deletes a single user
         * Default mapping to DEL '~/users/:id', no GET mapping
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function destroy(req, res) {
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

        this.router.delete('/:user_id', destroy);

        /**
         * Delete action, deletes a all users
         * Default mapping to DEL '~/users', no GET mapping
         *
         * @param {Object} req
         * @param {Object} res
         * @param {Function} next
         **/
        function truncate(req, res) {
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

        this.router.delete('/truncate', truncate);
    }
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
}