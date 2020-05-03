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
});

module.exports  = groupChatRouter;