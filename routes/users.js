var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');
const uploadRouter = require('./uploadRouter');


router.use('/uploadProfile', uploadRouter);


router.use(bodyParser.json());

router.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )
.get(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
  User.find({})
  .populate('groups')
  .then((users) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
});

router.route('/searchUser')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); } )
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  User.findOne({username: req.body.username})
  .populate('groups')
  .then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
});


router.post('/signup',  cors.corsWithOptions, (req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
      // console.log("request", req.body);
      // console.log("error", err);
      // console.log("user", user);
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if(req.body.firstname) user.firstname = req.body.firstname;
      if(req.body.lastname) user.lastname = req.body.lastname;
      if(req.body.bio) user.bio = req.body.bio;
      if(req.body.dateofbirth) user.dateofbirth = req.body.dateofbirth;
      if(req.body.teacher) user.teacher = req.body.teacher;
      if(req.body.aaa) user.aaa = req.body.aaa;

      user.save((err,user) => {
        if(err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});  
          return;        
        }
        passport.authenticate('local')(req, res, () => {
          // console.log("say something");
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.post('/login', cors.corsWithOptions, (req, res, next) => {

  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: false, status: 'Login Unsuccessful!', err: info});
    }
    req.logIn(user, (err) => {
      if (err) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});          
      }

      var token = authenticate.getToken({_id: req.user._id});
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({success: true, status: 'Login Successful!', token: token});
    }); 
  }) (req, res, next);
});

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/facebook/token', passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});

router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', {session: false}, (err, user, info) => {
    if (err)
      return next(err);
    
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT invalid!', success: false, err: info});
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({status: 'JWT valid!', success: true, user: user});
    }
  }) (req, res);
});

router.route('/updateProfile')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, {
    $set: req.body
}, {new: true})
.then((user) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(user);
}, (err) => next(err))
.catch((err) => next(err));
});


module.exports = router;
