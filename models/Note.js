const mongoose = require("mongoose");

const noteSchema=new mongoose.Schema({

title:{
type:String,
required:true
},

subject:{
type:String,
required:true
},

branch:{
type:String,
required:true
},

semester:{
type:Number,
required:true
},

description:{
type:String,
default:""
},

pdf:{
type:String,
required:true
},

previewImages:{
type:[String],
default:[]
},

pages:{
type:Number,
default:0
},

uploader:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

downloads:{
type:Number,
default:0
},

approved:{
type:Boolean,
default:false
}

},{
timestamps:true
});

module.exports=mongoose.model("Note",noteSchema);