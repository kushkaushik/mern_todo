const mongoose  = require('mongoose');
const {ObjectId} = mongoose.Types;
const newSch = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    postedby:{
        type:ObjectId,
        ref:"todouser"
    }


})

mongoose.model("mytodo",newSch);