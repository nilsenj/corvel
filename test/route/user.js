/**
 *  User Functional Test
 *  Created by caminte-cli script
 **/

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}

var request = require('supertest');
var app = require('../../app');
var id, user;

describe('User routes:', function () {

    before(function (done) {
       done();
    });

    after(function (done) {
       done();
    });

    it('users#new', function (done) {
        request(app)
            .get('/users/new')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('users#create', function (done) {
        request(app)
            .post('/users')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                id = res.body.id;
                done();
            });
    });


    it('users#index', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.array;
                done();
            });
    });

    it('users#count', function (done) {
        request(app)
            .get('/users/count')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                res.body.should.be.have.property('count');
                done();
            });
    });

    it('users#show', function (done) {
        request(app)
            .get('/users/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                user = res.body;
                done();
            });
    });

    it('users#update', function (done) {
        request(app)
            .put('/users/' + id)
            .set('Accept', 'application/json')
            // .field('name', 'my awesome avatar')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('users#delete', function (done) {
        request(app)
            .delete('/users/' + id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('users#deleteAll', function (done) {
        request(app)
            .delete('/users/truncate')
            .set('Accept', 'application/json')
            .expect(204)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

});
