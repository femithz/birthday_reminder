/*jshint esversion: 6 */
// Schema for user contact
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ContactSchema=mongoose.Schema({
    _id:{
        type:Number,
        unique: true,
    },
    contactOwner: {
         id:{
             type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
          },
          username:{
              type: String
          }
         },
    name:{
    	type:String,
        require:true,
        trim: true, 
    },
    birthday: {
        type:Date,
        require:true,
        trim: true, 
    },
    email:{
       type:String,
       trim: true, 
       unique: true,
       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    address:{
        type:String,
        trim: true,
     },
    phoneNumber:{
        type:String,
        unique: true,
     },
     createdAt:{
        type:Date,
    	require:true,
    }
});
ContactSchema.plugin(autoIncrement.plugin, 'Contact');
module.exports=mongoose.model('Contact',ContactSchema);
