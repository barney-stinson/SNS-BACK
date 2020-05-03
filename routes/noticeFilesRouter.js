const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const multer = require('multer');
const cors = require('./cors');
const path = require('path')


const Notices = require('../models/notices');
const NoticeFiles = require('../models/noticeFiles');


const storage = multer.diskStorage({
    destination: (req, files, cb) => {
        cb(null, 'public/noticeFiles');
    },

    filename: (req, files, cb) => {
        cb(null, req.user.username + Date.now() + files.originalname)
    }
});

const upload = multer({ storage: storage });

const noticeFilesRouter = express.Router();

noticeFilesRouter.use(bodyParser.json());

noticeFilesRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /noticeFiles');
})
.post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /noticeFiles');
})
.put(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /noticeFiles');
})
.delete(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /noticeFiles');
})

noticeFilesRouter.route('/:noticeId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /imageUpload/'+req.params.noticeId);
})
.post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin || authenticate.verifyAAA || authenticate.verifyTeacher, upload.array('myFiles', 12), (req, res, next) => {
    const files = req.files
    if (!files) {
      const err = new Error('Please choose files')
      err.httpStatusCode = 400
      return next(err)
    }
    for(let i=0;i<Object.keys(files).length;i++){
        let x = `public/noticeFiles/${files[i].filename}`;
        let y =  path.extname(files[i].filename).split('.')[1];
        NoticeFiles.create({"notice": req.params.noticeId, "filePath": x, "fileType": y});
        NoticeFiles.findOne({notice: req.params.noticeId})
        .populate('notice');
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(files); 
})
.put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /imageUpload/'+req.params.noticeId);
})

module.exports = noticeFilesRouter;
