const express = require('express');
const  mongoose  = require('mongoose');
const loginmid = require('../loginmid')

const route = express.Router();
const MYTODO = mongoose.model("mytodo");




route.get('/mypost',loginmid,(req,res)=>{
    console.log(req.user)
    Post.find({postedby:req.user}).populate("postedby","id name").then(data=>{
        res.json({data});
    })    
})



route.get('/showall',loginmid,(req,res)=>{
   MYTODO.find().populate("postedby","id name").then(datahere=>{
    res.json({datahere:datahere})
   }).catch(error=>{
    console.log(error);
   })
})



route.post('/getdata',loginmid,(req,res)=>{
    const {title , desc} = req.body;
    if(!title || !desc){
        res.json({error:"Please fill all the fields"});
    }else{
        const myuser = new MYTODO({
            title , desc , postedby:req.user
        })
        myuser.save().then(mydata=>{
            res.json({mydata:mydata})
        })
    }
})

route.delete("/del/:_id",loginmid,(req,res)=>{
    MYTODO.findByIdAndDelete(req.params._id).then(mydata=>{
        res.json(mydata)
    })


})



route.post("/edit/:_id",loginmid,(req,res)=>{
    MYTODO.findByIdAndUpdate(req.params._id , req.body).then(data=>{
        if(!data) return res.json({error:"Missing Somethin"})
        res.send(data);
    })
})





module.exports = route;