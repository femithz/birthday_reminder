var express = require('express');
var router = express.Router();
var Contact = require('../models/contact')
/* User section. */
router.get('/', function(req, res, next) {
  res.send('Api section for user activties');
});

// router to add contact
router.post('/contacts', function(req,res,next) {
    const contact = new Contact({
      name:req.body.name,
      email:req.body.email,
      address:req.body.address,
      birthday:req.body.birthday,
      phoneNumber:req.body.phoneNumber,
      createdAt:Date.now(),
    });
    contact.save(function (err,result) {
      if(err) { 
        return res.status(501).json({
          message:'New Contact cannot be creaeted'
        })
       } else {
         return res.status(200).json({
           contact:result,
           message:'You have successfully add a new contact'
         })
       }
    })
})
module.exports = router;
