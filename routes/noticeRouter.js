const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Notices = require('../models/notices');

const noticeRouter = express.Router();

noticeRouter.use(bodyParser.json());

noticeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) => {
   Notices.find(req.query)
   .populate('comments.author')
   .then((notices) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(notices);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Notices.create(req.body)
    .then((notice) => {
        console.log('Dish Created', notice);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notice);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /dishes');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    Notices.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));        
});


noticeRouter.route('/:noticeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser,(req,res,next) => {
    Notices.findById(req.params.noticeId)
    .populate('comments.author')
    .then((notice) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notice);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req,res,next) => {
    req.statusCode=403;
    res.end('POST operation not supported on /dishes/');
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req,res,next) => {
    Notices.findByIdAndUpdate(req.params.noticeId, {
        $set: req.body
    }, {new: true})
    .then((notice) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(notice);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req,res,next) => {
    Notices.findByIdAndDelete(req.params.noticeId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});


module.exports = noticeRouter;