const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        default:"Student"
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },

    points:{
        type:Number,
        default:0
    },

    approvedUploads:{
        type:Number,
        default:0
    },

    downloadCredits:{
        type:Number,
        default:0
    },

    premium:{
        type:Boolean,
        default:false
    },

    premiumExpiry:{
        type:Date,
        default:null
    }

},{
    timestamps:true
});

module.exports = mongoose.model("User",userSchema);