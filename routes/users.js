/**
 *  users Routes
 *
 *  Created by create caminte-cli script
 *  App based on CaminteJS
 *  CaminteJS homepage http://www.camintejs.com
 **/
let _ = require('underscore');
let express = require('express');
let caminte = require('caminte');
let boom = require('boom');
let router = express.Router({mergeParams: true});
let middleware;

/* params router level */
router.param('user_id', function (req, res, next, user_id) {
   if (/^\d+$/.test(user_id)) {
      next();
   } else {
      next('route');
   }
});

/* middleware router level */
if (middleware) {
   router.use(middleware);
}

/**
* Index action, returns a list either
* Default mapping to GET '~/users'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function list(req, res) {
    var User = caminte.model('User');
    var query = req.query;
    var skip = query.skip ? parseInt(query.skip) - 1 : 0;
    var limit = query.limit ? parseInt(query.limit) : 20;

    var opts = {
        skip: skip,
        limit: limit,
        where: {}
    };

    delete query.skip;
    delete query.limit;
    // TODO: it needs implementation for search
    _.extend(opts.where, query);

    User.all(opts, function (err, users) {
        if (err) {
           res.status(400);
           return res.json(boom.badRequest(err.message || err).output.payload);
        }
        res.status(200);
        res.json(users);
    });
};

router.get('/', list);

/**
 * Count items action, returns amount of user
 * Default mapping to GET '~/users/count'
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 **/
function count(req, res) {
    var User = caminte.model('User');
    var query = req.query;

    var opts = {
        where: {}
    };

    // TODO: it needs implementation
    _.extend(opts.where, query);

    User.count(opts.where, function (err, count) {
        if (err) {
           res.status(400);
           return res.json(boom.badRequest(err.message || err).output.payload);
        }
        res.status( 200 );
        res.json( {
           count: count
        });
   });
}

router.get('/count', count);

/**
* New action, returns new a single user
* Default mapping to GET '~/users/new'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function empty(req, res) {
    var User = caminte.model('User');
    var user = new User(req.query);
    res.status(200);
    res.json(user.toObject());
}

router.get('/new', empty);

/**
* Show action, returns shows a single user
* Default mapping to GET '~/users/:id'
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function show(req, res) {
    var User = caminte.model('User');
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.status(400);
            return res.json(boom.badRequest(err.message || err).output.payload);
        }
        if (user) {
            res.status(200);
            res.json(user.toObject());
        } else {
            res.status(404);
            res.json(boom.notFound('user not found').output.payload);
        }
    });
}

router.get('/:user_id', show);

/**
* Update action, updates a single user
* Default mapping to PUT '~/users/:id', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function update(req, res) {
    var query = req.body;
    var User = caminte.model('User');
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.status(400);
            return res.json(boom.badRequest(err.message || err).output.payload);
        }
        if (user) {

            _.extend(user, query);

            user.isValid(function (isValid) {
                if(isValid) {
                    user.updateAttributes(req.body, function (err) {
                        if (err) {
                            res.status(400);
                            return res.json(boom.badRequest(err.message || err).output.payload);
                        }
                        res.status(200);
                        res.json(user.toObject());
                    });
                } else {
                    res.status(422);
                    var error = boom.badData('data is bad you should fix it').output.payload;
                    error.attributes = user.errors;
                    return res.json(error);
                }
            });
        } else {
            res.status(404);
            res.json(boom.notFound('user not found').output.payload);
        }
    });
}

router.put('/:user_id', update);

/**
* Create action, creates a single user
* Default mapping to POST '~/users', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function create(req, res) {
    var User = caminte.model('User');
    var user = new User(req.body);
    user.isValid(function (isValid) {
        if (!isValid) {
           res.status(422);
           var error = boom.badData('data is bad you should fix it').output.payload;
           error.attributes = user.errors;
           return res.json(error);
        }
        user.save(function (err) {
            if (err) {
               res.status(400);
               return res.json(boom.badRequest(err.message || err).output.payload);
            }
            res.status(201);
            res.json(user.toObject());
        });
   });
}

router.post('/', create);

/**
* Delete action, deletes a single user
* Default mapping to DEL '~/users/:id', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function destroy(req, res) {
    var User = caminte.model('User');
    User.findById(req.params.user_id, function (err, user) {
        if (err) {
            res.status(400);
            return res.json(boom.badRequest(err.message || err).output.payload);
        }
        if (!user) {
            res.status(404);
            return res.json(boom.notFound('user not found').output.payload);
        }
        user.destroy(function (err) {
            if (err) {
               res.status(400);
               return res.json(boom.badRequest(err.message || err).output.payload);
            } else {
               res.status(204);
               res.json({
                  message: 'users deleted!'
               });
            }
        });
    });
}

router.delete('/:user_id', destroy);

/**
* Delete action, deletes a all users
* Default mapping to DEL '~/users', no GET mapping
*
* @param {Object} req
* @param {Object} res
* @param {Function} next
**/
function truncate(req, res) {
    var User = caminte.model('User');
    User.destroyAll(function (err) {
        if (err) {
          res.status(400);
          return res.json(boom.badRequest(err.message || err).output.payload);
        } else {
          res.status(204);
          res.json({
            statusCode: 204,
            message: 'All users deleted'
          });
        }
    });
}

router.delete('/truncate', truncate);

module.exports = router;
