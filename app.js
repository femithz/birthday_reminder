const express=require('express');
const path=require('path');
const bodyparser=require('body-parser');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const http = require('https');
const autoIncrement = require('mongoose-auto-increment');
const DB_URI = process.env.MONGOLAB_URI;
// Database connection implementation
if (process.env.NODE_ENV === 'test') {
  const Mockgoose = require('mockgoose').Mockgoose;
  const mockgoose = new Mockgoose(mongoose);
  mockgoose.prepareStorage().then(() => {
    mongoose.connect(DB_URI, {
      useCreateIndex: true,
       useNewUrlParser: true  }).then(
      (res) => {
      res.status(200).json({message:"Connection Failure"});
      }
    ).catch((err) => {
    err => console.error();
    });
  })
} else {
      mongoose.connect(DB_URI, {
        useCreateIndex: true,
      useNewUrlParser: true  }).then(
    (res) => {
    res.status(200).json({message:"Connection Failure"});
    }
    ).catch((err) => {
    err => console.error();
    });
}
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