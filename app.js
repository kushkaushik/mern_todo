const express = require('express')
const mongoose = require('mongoose')

const {URI} = require('./db')

const app  = express();




app.use(express.json());
app.use(express.urlencoded({extended:true}));



mongoose.connect(URI);
mongoose.connection.on('connected',()=>{
    console.log("Sucessfully connected to database")
})


require("./schema/myuser");
require("./schema/Todo");
app.use(require('./router/auth'))
app.use(require('./router/post'))



app.listen(7000,()=>{
    console.log("Connected at Port 7000");
})





