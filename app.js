const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require('https');
const autoIncrement = require('mongoose-auto-increment');
// var url = process.env.MONGOLAB_URI;
// Database connection implementation
mongoose.connect('mongodb://femithz:birthdayreminder12345@ds247377.mlab.com:47377/birthday_reminder', {
      useCreateIndex: true,
    useNewUrlParser: true  }).then(
  (res) => {
   res.status(200).json({message:"Connection Failure"});
  }
).catch((err) => {
 err => console.error();
});
autoIncrement.initialize(mongoose.connection);
var app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const port=process.env.PORT || 3000;
// view engine setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyparser.json());
// Api endpoint setup
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.get('*', (req,res) => {
  res.send('Welcome to Birthday Reminder Api an awesome idea!!!');
});
app.listen(port, process.env.IP, () => {
         console.log('Server is running on' + port);        
})