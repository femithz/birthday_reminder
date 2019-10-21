/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var Reminder = require('../models/reminder');
var jwt = require('jsonwebtoken');

router.get('/', function(req, res, next) {
    res.send('Api section for reminder activties');
});

// Function to add reminder
router.post('/reminder', verifyToken, function (req,res) {
    const userId = {
        id: req.user._id,
        username: req.user.username
    }
    const  reminder = new Reminder({
        userId:userId,
        days:req.body.days,
        createdAt:Date.now(),
        updatedAt:  '',
    })
    reminder.save(function (err,result) {
        if (err) {
          return res.status(501).json({
              error:err
          })
        }else{
         return res.status(200).json({
            result:result,
            message:'Interest as been created',
          })
        };
      })
    
})
// Function to get reminder 
router.get('/reminders', verifyToken, function (req,res,next) {
  const pagination = req.query.pagination
   ?parseInt(req.query.pagination)
   : 10;
   const page = req.query.page
   ?parseInt(req.query.page)
   : 1;
   Contact
   .find()
   .skip((page - 1) * pagination)
   .limit(pagination)
   .select('days')
   .populate('user')
   .exec()
   .then(result => {
    console.log(result);
         return res.status(200).json(result);
})
.catch(err => {
          res.status(500).json(err);
})
})
// router to fetch user reminder detail by id
router.get('/:id', verifyToken, function (req,res,next) {
  const id = req.params.id;
  Reminder.findById(id)
  .select()
  .populate('user')
  .exec()
  .then(doc=>{
     if(doc){
      res.status(200).json(doc);
     }else{
      res.status(200).json({
        message:'Invalid Id Number',
      });
     }
    })
    .catch(err=>{
      res.status(500).json({
          error:err
       });
    });
});
//   section to patch the reminder
router.put('/:id', verifyToken,reminderOwner, function (req,res,next) {
  const id=req.params.id;
  const updateOps={};
  for(const ops of req.body){
     updateOps[ops.propName]=ops.value;
  }
  Reminder.findOneAndUpdate({_id:id},{$set:updateOps})
  .exec()
  .then(result=>{
    res.status(200).json({
      result:result,
      message:'Reminder updated successfully',
    });
  })
  .catch(err=>{
    res.status(200).json({
      error:err
    });
  });
})
// Function to delete reminder
router.delete('/:id',verifyToken,reminderOwner, function (req,res) {
  Reminder.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.status(501).json(err);
    } else {
      res.status(200).json({
        message:"reminder has been successfully removed"
      });
    }
  })
})
// Function to get to verifyToken
function verifyToken(req,res,next) {
    const  bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
       const bearer = bearerHeader.split();

       const bearerToken = bearer[1];

       req.token = bearerToken;


       next();
    } else {
      res.sendStatus(403);
    }
}
// Funtion to check for the user that owns the contact
function reminderOwner(req,res,next) {
  if (req.isAuthenticated()) {
       Reminder.findById(req.params.id, function (err,result) {
         if (err) {
           return res.status(501).json(err);
         } else {
           if (result.userId.id.equals(res.user._id)) {
           next();  
           } else {
             console.log('Permission not granted');
           }
         }
       })
  }
}
module.exports = router;