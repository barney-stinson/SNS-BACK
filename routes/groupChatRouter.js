const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const GroupChats = require('../models/groupChats');
const Groups = require('../models/groups');

const groupChatRouter = express.Router();

groupChatRouter.use(bodyParser.json());


groupChatRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    GroupChats.find(req.query)
    .populate('user')
    .then((groupChats) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(groupChats);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    if (req.body != null) {
        req.body.user = req.user._id;
        GroupChats.create(req.body)
        .then((groupChat) => {
            GroupChats.findById(groupChat._id)
            .populate('user')
            .then((groupChat) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(groupChat);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Message not found in request body');
        err.status = 404;
        return next(err);
    }
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /groupChats/');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    GroupChats.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});


groupChatRouter.route('/:groupChatId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, (req,res,next) => {
    GroupChats.findById(req.params.groupChatId)
    .populate('user')
    .then((groupChat) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(groupChat);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /groupChats/');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /groupChats/');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    GroupChats.findById(req.params.groupChatId)
    .then((groupChat) => {
        if (groupChat != null) {
            if (!groupChat.user.equals(req.user._id)) {
                var err = new Error('You are not authorized to delete this message!');
                err.status = 403;
                return next(err);
            }
            GroupChats.findByIdAndRemove(req.params.groupChatId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            err = new Error('Message ' + req.params.groupChatId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports  = groupChatRouter;