// Schema for User
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcryptjs');
const autoIncrement = require('mongoose-auto-increment');

var UserSchema=mongoose.Schema({
    _id:{
        type:Number,
        unique: true,
    },
    name:{
    	type:String,
        require:true,
        trim: true, 
        unique: true,
    },
    email:{
       type:String,
       require:true,
       trim: true, 
       unique: true,
       match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    password:{
        type:String,
        require:true,
     },
     createdAt:{
        type:Date,
    	require:true,
    },
    updatedAt:{
        type:Date,
    	require:true,
    },
});

UserSchema.statics.hashPassword=function hashPassword(password){
    return bcrypt.hashSync(password,10)
};
UserSchema.methods.isValid=function (hashedpassword) {
    return bcrypt.compareSync(hashedpassword,this.password);
};

UserSchema.plugin(autoIncrement.plugin, 'User');
module.exports=mongoose.model('User',UserSchema);