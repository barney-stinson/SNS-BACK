const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
const groupRouter = express.Router();

const Groups = require('../models/groups');
var users = require('../models/user'); 

groupRouter.use(bodyParser.json());


groupRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Groups.find(req.query)
    .populate('admin')
    .populate('users')
    .then((groups) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(groups);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    if (req.body != null) {
        req.body.admin = req.user._id;
        req.body.users = req.user._id;
        Groups.create(req.body)
        .then((group) => {
            Groups.findById(group._id)
            .populate('admin')
            .populate('users')
            .then((group) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(group);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Group not found in request body');
        err.status = 404;
        return next(err);
    }
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /groups');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Groups.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));        
});


groupRouter.route('/:groupId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) => {
    Groups.findById(req.params.groupId)
    .populate('admin')
    .populate('users')
    .then((group) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(group);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, (req,res,next) => {
    req.statusCode=403;
    res.end('POST operation not supported on /groups/');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Groups.findById(req.params.groupId)
    .then((group) => {
        if (group != null) {
            if (!group.admin.equals(req.user._id)) {
                var err = new Error('You are not authorized to update this group info!');
                err.status = 403;
                return next(err);
            }
            req.body.admin = req.user._id;
            Groups.findByIdAndUpdate(req.params.groupId, {
                $set: req.body
            }, { new: true })
            .then((group) => {
                Groups.findById(group._id)
                .populate('admin')
                .populate('users')
                .then((group) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(group); 
                })               
            }, (err) => next(err));
        }
        else {
            err = new Error('Group ' + req.params.groupId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    Groups.findById(req.params.groupId)
    .then((group) => {
        if (group != null) {
            if (!group.admin.equals(req.user._id)) {
                var err = new Error('You are not authorized to delete this notice!');
                err.status = 403;
                return next(err);
            }
            Groups.findByIdAndRemove(req.params.groupId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            err = new Error('Group ' + req.params.groupId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

groupRouter.route('/addToGroup/:groupId')
.options(cors.corsWithOptions, (req, res) => {res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Groups.findById(req.params.groupId)
    .then((group) =>{
        if(group.password != req.body.password) {
            var err = new Error("Invalid Password!");
            err.status = 406;
            return next(err);
        }

        users.findByIdAndUpdate(req.user._id, {
            $push: {groups: req.params.groupId}
        },{new:true}, function(err, result) {
            if (err) {
              res.send(err);
            }
        });
        Groups.findByIdAndUpdate(req.params.groupId, {
            $push: {users: req.user._id}
        },{new: true})
        .then((group) => {
            Groups.findById(req.params.groupId)
            .populate('admin')
            .populate('users')
            .then((group) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(group);  
            },(err)=>next(err))
        .catch((err)=>next(err))
        })
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = groupRouter;
