const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const {seckey} = require('../db');
const tok  = require('jsonwebtoken');
const route = express.Router();
const TODOUSER = mongoose.model('todouser')



route.post('/signin',(req,res)=>{
    const {name , email  , password} = req.body;
    if(!name || !email || !password){
        res.json({error:"Please fill the records"});
    }


    else{
    TODOUSER.findOne({email}).then(mydata=>{
        if(mydata)
        {
         return res.json({error:"User is already present"});
        }

        bcrypt.hash(password,12).then(hashpassword=>{
            const todouser =new TODOUSER({
                name , email , password:hashpassword
            });
            todouser.save().then(datahere=>{
                return res.json({message:"Data Saved Sucesfully"})
            })
        })
       
       
    })
}
})




route.post('/signup',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password) {
        return res.json({error:"Please fill all the records"})
    }
    else{
        TODOUSER.findOne({email}).then(mydata=>{
            if(!mydata){
                return res.json({error:"Wrong data entered"});
            }
            else{

                bcrypt.compare(password,mydata.password).then(data=>{
                    if(data){
                        const token = tok.sign({_id:mydata._id},seckey);
                        const {_id , name , email , password}  = mydata
                        return res.json({token,user:{_id, name , email , password}});
                    }else{
                        res.json({error:"Wrong data entered"});
                        
                    }
                })
            }
        })
    }

})







// route.post('/account',(req,res)=>{
//     const {token}  = req.body;
//     if(token){
//         tok.verify(token,seckey,(err,decoded)=>{
//             if(err) return res.json({error:"Incorrect Link"})
//             const {name , email ,password} = decoded

         

//             TODOUSER.findOne({email}).then(mydata=>{
//                 if(mydata)
//                 {
//                  return res.json({error:"User is already present"});
//                 }
        
//                 const tokendata = tok.sign({name , email , password},seckey);
              
                
        
//                 bcrypt.hash(password,12).then(hashpassword=>{
//                     const todouser =new TODOUSER({
//                         name , email , password:hashpassword
//                     });
//                     todouser.save().then(datahere=>{
                        
//                         res.json({message:"Data is successfully stored"});
                        
//                 })
//                 })
               
               
//             })
//         })


    


        
//         }
    
//     else{
//         res.json({error:"Something went wrong"})
//     }
// })





module.exports =  route;

