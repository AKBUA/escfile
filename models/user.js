const mongoose=require('mongoose');
const validator=require('node-mongoose-validator')

const Schema=mongoose.Schema;
const userSchema=new Schema({


   
    
userName:{
    type:String,
    required:true,
    unique:true,
    minlength:4
},

password:{
    type:String,
    required:true,
    minlength:5
    
}


})

module.exports=mongoose.model('user',userSchema)