import React, { useState } from 'react'
import M from 'materialize-css'
import {  useNavigate } from 'react-router-dom';

const Todo = () => {

  const [title ,setTitle] = useState("");
  const [desc ,setDesc] = useState("");
const history = useNavigate();

  const myself = ()=>{
    fetch("/getdata",{
      "method":"POST",
      headers:{
        "Content-Type":"application/json",
        "authorization":"Kush " + localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        title , desc
      })
    }).then(res=>res.json()).then(data=>{
      if(data.error)
    M.toast({html: data.error, classes: 'rounded #c62828 red darken-3'});
    else{
    M.toast({html: "SucessFully Todo-Added", classes: 'rounded ##00c853 green accent-4'});
        history('/');
    }
    })
  }



  return (
    <div  id="mycard" className='container card'>

    <div className="row">
          <h4 id="myid">ADD-TODO</h4>
      <div id="inputji" className="input-field col s6">
     
      <textarea value={title} onChange = {(e)=>setTitle(e.target.value)} placeholder="Title" id="textarea2" class="materialize-textarea" data-length="1200"></textarea>
      <textarea value={desc} onChange = {(e)=>setDesc(e.target.value)} placeholder="Description" id="textarea2" class="materialize-textarea" data-length="1200"></textarea>

      <button onClick={()=>myself()} id = "buttonji" class="waves-effect waves-light btn">Submit</button><br/><br/>
    
      </div>
  
  
  
    </div>
          
  
  
  
  
      </div>
  )
}

export default Todo