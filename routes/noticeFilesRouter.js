const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const path = require('path')


const Notices = require('../models/notices');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/noticeFiles');
    },

    filename: (req, file, cb) => {
        cb(null, req.user.username + Date.now() + file.originalname)
    }
});

const imageFileFilter = (req, file, cb) => {
    if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('You can upload only image files!'), false);
    }
    cb(null, true);
};


const upload = multer({ storage: storage, fileFilter:imageFileFilter});

const noticeFilesRouter = express.Router();

noticeFilesRouter.use(bodyParser.json());

noticeFilesRouter.route('/:noticeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload/'+req.params.noticeId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, upload.single('imageFile'), (req, res, next) => {
    let x = "public/noticeFiles/"+ req.file.filename;
    Notices.findByIdAndUpdate(req.params.noticeId, {
        $set: {"file": x},
    }, {new: true}, function(err, result) {
        if (err) {
          res.send(err);
        }
      });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.file);
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload/'+req.params.noticeId);
})

module.exports = noticeFilesRouter;
