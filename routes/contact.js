/*jshint esversion: 6 */
var express = require('express');
var router = express.Router();
var Contact = require('../models/contact');
var jwt = require('jsonwebtoken');
/* User section. */
router.get('/', function(req, res, next) {
  res.send('Api section for user activties');
});

// router to add contact
router.post('/contacts', verifyToken, function(req,res,next) {
  jwt.verify(req.token, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
       res.sendStatus(403);
    } else {
      const contact = new Contact({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        birthday:req.body.birthday,
        phoneNumber:req.body.phoneNumber,
        contactOwner:req.user._id,
        createdAt:Date.now(),
      });
      contact.save(function (err,result) {
        if(err) { 
          return res.status(501).json({
            message:'New Contact cannot be creaeted',
          })
         } else {
           return res.status(200).json({
             contact:result,
             message:'You have successfully add a new contact',
           })
         }
      });
    }
  })
});
// router to fetch user contact
router.get('getContacts', verifyToken, function (req,res,next) {
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
   .select('name birthday')
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
// router to fetch user contact detail by id
router.get('getContact/:contactId', verifyToken, function (req,res,next) {
  const id = req.params.contactId;
  Contact.findById(id)
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
module.exports = router;