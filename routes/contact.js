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
      birthday:req.body.address,
    });
    console.log(contact);
})
module.exports = router;
