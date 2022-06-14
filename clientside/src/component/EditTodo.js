import React, { useState } from 'react'
import M from 'materialize-css'
import {  useNavigate } from 'react-router-dom';





const EditTodo = () => {
    const [title ,setTitle] = useState(localStorage.getItem("title"));
    const [desc ,setDesc] = useState(localStorage.getItem("desc"));

    const history  = useNavigate();

    const myself = ()=>{
      fetch("/edit/" + localStorage.getItem("myid"),{
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
      M.toast({html: "SucessFully Edit-Todo", classes: 'rounded ##00c853 green accent-4'});
          history('/');
      }
      })
    }
  


    return (
        <div  id="mycard" className='container card'>
    
        <div className="row">
              <h4 id="myid">Edit-TODO</h4>
          <div id="inputji" className="input-field col s6">
         
          <textarea value={title} onChange = {(e)=>setTitle(e.target.value)} placeholder="Title" id="textarea2" class="materialize-textarea" data-length="1200"></textarea>
          <textarea value={desc} onChange = {(e)=>setDesc(e.target.value)} placeholder="Description" id="textarea2" class="materialize-textarea" data-length="1200"></textarea>
    
          <button  onClick={()=>myself()}  id = "buttonji" class="waves-effect waves-light btn">Submit</button><br/><br/>
        
          </div>
      
      
      
        </div>
              
      
      
      
      
          </div>
      )
}

export default EditTodo