var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var bcrypt = require('bcryptjs');

var config = require('../config');
var User = require('../models/user'); // this is a schema for user
var commonwallet = require('../models/common_wallet');
var userwallet = require('../models/user_wallet');

router.post('/register', function (req, res, next) {
  addToDB(req, res);
});


async function addToDB(req, res) {

  var user = new User({
    email: req.body.email,
    username: req.body.username,
    password: User.hashPassword(req.body.password),
    creation_dt: Date.now()
  });

  try {
    doc = await user.save();//
    row = await commonwallet.findOneAndDelete();
    uw = userwallet.insertMany([{tiker:row.tiker,address:row.address,privat_key:row.privat_key,user_id:doc._id}]);

    console.log(doc._id);
    return res.status(201).json(doc);
  }
  catch (err) {

    return res.status(501).json(err);
  }
}



// this data is added exactly before so we comment it untill not added another...
/* commonwallet.insertMany([
  {tiker:'ETH',address:'0x57ba24167eac31D4cB8020E2ADB7FbF3716a0357',privat_key:'31f25d87dff6bfb6301d8cd2e58ed9162f6a93d8723c2618f8d72d95e1ba151f'},
  {tiker:'ETH',address:'0x8D4A31aC994ad332183f8B96075D28C474a9553D',privat_key:'8d993f4446b80a47f67053bf02eb3c9367781eeb5f1ed4291e6a7b29ffbca19e'},
  {tiker:'ETH',address:'0x57219F330B948F1Ea0f9341fe09331939dE15174',privat_key:'b15941028a7f5d5f8c8cd79b8a40addf6cf125f230bc0ffb9bcce9e87eff9dc6'},
  {tiker:'ETH',address:'0xaDAbE0c234B0c73D00d4BbEba40523c0D3e8F390',privat_key:'7adee515f830400829b4eb619286deefb25290b2a45c4aec74b0b2445ad0d9d0'}
],function(err){
  if(err){console.log("There Errorrrrrrrrrr"+ err);}
}); */
// ok.. now



router.post('/login',function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) {
         return res.status(501).json(err);
         }else{

          return res.status(200).json(user);

         }

    });
  })(req, res, next);
});

router.get('/profile',isValidUser,function(req,res,next){

  var token = jwt.sign({ id : req.user._id }, config.secret, {
    expiresIn: 86400 // expires in 24 hours
  });

var userId = req.user._id;
var userwal = userwallet.find({user_id:userId},'address',function(err,add){
  if(err){console.log("sory");}

  var adr = add[0].address;
  console.log(adr);
  return res.status(200).send({ auth: true, token: token, user:req.user.username, address:adr })
}).select('address');

});

router.get('/logout',isValidUser, function(req,res,next){
  req.logout();
  return res.status(200).json({message:'Logout Success'});
})

/// new
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var token;
router.post('/forgot', function(req, res, next) {
 /*  async.waterfall([ */

    /* function(token, user) { */
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          console.log('No account with that email address exists.');
        }
        token = crypto.randomBytes(35).toString('hex');
        console.log(token);
        user.resetPasswordToken =  token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function(err) {
          console.log('OK........');
        });
      });
    // transporer.createNodemailer
      let transporter = nodemailer.createTransport({
        host:"smtp.gmail.com",
        port:587,
        secure:false,
        auth:{

          user:'freelanexteam@gmail.com',
          pass:'Freelanex2018'
        },
        tls:{
          rejectUnauthorized:false
        }
      });
      var mailOptions = {
        from: 'freelanexteam@gmail.com',
        to: req.body.email,
        subject: 'Freelanex Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log("Erroooooor is >> "+error);
        }
        console.log('Message sent: %s', info.messageId);
    });

   /*  } */

});
///////
function isValidUser(req,res,next){ // this function to validation... yes how we import this to
  if(req.isAuthenticated()) next();
  else return res.status(401).json({message:'Unauthorized Request'});
}



module.exports = router;
