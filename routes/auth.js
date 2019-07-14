const express = require('express');
const router = express.Router();
const  jwt  =  require('jsonwebtoken');
const User = require('../models/user');

/* GET authentication section of the API. */
router.get('/', function(req, res, next) {
  res.send('Api authentication section for user');
});
// router for user registration
router.post('/signup', function (req,res) {
  const user = new User({
    name:req.body.name,
    email:req.body.email,
    password:User.hashPassword(req.body.password),
    createdAt:Date.now()
  });
  user.save(function (err,result) {
    if (err) { return res.status(501).json({message:'User cannot be created',})
    }else{
     User.findUserByEmail(email, (err, user)=>{
        if (err) return  res.status(500).json({message:'Server error',}) 
        if (user) {
          return res.status(500).json({message:'User with this email already exist'})
        } else {
          const  expiresIn  =  24  *  60  *  60;
          const  accessToken  =  jwt.sign({ id:  user.id }, process.env.SECRET_KEY, {
              expiresIn:  expiresIn
          });
          return  res.status(200).send({
             "user":  result,
             "access_token":  accessToken,
             "expires_in":  expiresIn ,  
              message:'User created successfully',        
          });
        }
  })  
}
})
})
// router for user login
router.post('/login', function(req, res) {
  const  email  =  req.body.email;
  const  password  =  req.body.password;
  User.findUserByEmail(email, (err, user)=>{
        if (err) return  res.status(500).send('Server error!');
        if (!user) return  res.status(404).send('User not found!');
        const  result  =   User.isValid(password, user.password);
        if(!result) return  res.status(401).send('Password not valid!');

        const  expiresIn  =  24  *  60  *  60;
        const  accessToken  =  jwt.sign({ id:  user.id }, process.env.SECRET_KEY, {
            expiresIn:  expiresIn
        });
        res.status(200).send({ "user":  user, "access_token":  accessToken, "expires_in":  expiresIn});
    });
}); 
module.exports = router;
 