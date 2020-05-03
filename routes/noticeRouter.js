const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const noticeRouter = express.Router();


const Notices = require('../models/notices');
const NoticeFiles = require('../models/noticeFiles');

noticeRouter.use(bodyParser.json());
const noticeFilesRouter = require('./noticeFilesRouter');


noticeRouter.use('/noticeFiles', noticeFilesRouter);

noticeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
   Notices.find(req.query)
   .populate('author')
   .then((notices) => {
       res.statusCode = 200;
       res.setHeader('Content-Type', 'application/json');
       res.json(notices);
   }, (err) => next(err))
   .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    if (req.body != null) {
        req.body.author = req.user._id;
        Notices.create(req.body)
        .then((notice) => {
            Notices.findById(notice._id)
            .populate('author')
            .then((notice) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(notice);
            })
        }, (err) => next(err))
        .catch((err) => next(err));
    }
    else {
        err = new Error('Notice not found in request body');
        err.status = 404;
        return next(err);
    }
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
    .populate('author')
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
    Notices.findById(req.params.noticeId)
    .then((notice) => {
        if (notice != null) {
            if (!notice.author.equals(req.user._id)) {
                var err = new Error('You are not authorized to update this notice!');
                err.status = 403;
                return next(err);
            }
            req.body.author = req.user._id;
            Notices.findByIdAndUpdate(req.params.noticeId, {
                $set: req.body
            }, { new: true })
            .then((notice) => {
                Notices.findById(notice._id)
                .populate('author')
                .then((notice) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(notice); 
                })               
            }, (err) => next(err));
        }
        else {
            err = new Error('Notice ' + req.params.noticeId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req,res,next) => {
    Notices.findById(req.params.noticeId)
    .then((notice) => {
        if (notice != null) {
            if (!notice.author.equals(req.user._id)) {
                var err = new Error('You are not authorized to delete this notice!');
                err.status = 403;
                return next(err);
            }
            Notices.findByIdAndRemove(req.params.noticeId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp); 
            }, (err) => next(err))
            .catch((err) => next(err));
        }
        else {
            err = new Error('Notice ' + req.params.noticeId + ' not found');
            err.status = 404;
            return next(err);            
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = noticeRouter;