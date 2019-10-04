/*jshint esversion: 6 */
// Schema for user contact
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');

var ReminderSchema=mongoose.Schema({
    _id:{
        type:Number,
        unique: true,
    },
    userId: {
         id:{
             type: mongoose.Schema.Types.ObjectId,
              ref: 'User'
          },
          username:{
              type: String
          }
         },
         days:{
           type:Number,
         },
     createdAt:{
        type:Date,
    	require:true,
    },
    updatedAt:{
        type:Date,
    	require:true,
    }
});
ReminderSchema.plugin(autoIncrement.plugin, 'Reminder');
module.exports=mongoose.model('Reminder',ReminderSchema);
