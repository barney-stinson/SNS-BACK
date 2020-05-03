const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');
const groupRouter = express.Router();

const Groups = require('../models/groups');

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
});


module.exports = groupRouter;
