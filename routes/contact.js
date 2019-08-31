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
      contactOwner,
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
// router to fetch user contact
router.get('getContacts', function (req,res,next) {
   Contact
   .find()
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
router.get('getContact/:contactId', function (req,res,next) {
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
        message:'Invalid Id Number'
      });
     }
    })
    .catch(err=>{
      res.status(500).json({
          error:err
       });
    });
})
module.exports = router;
