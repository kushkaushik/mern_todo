import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import M from 'materialize-css'


const Signup = () => {

const history = useNavigate();
const postData = ()=>{
  fetch("/signin",{
    "method":"POST",
    headers:{
      "Content-Type":"application/json",
      'Accept': 'application/json'

    },
    body:JSON.stringify({
      name, email ,password
    })
  }).then(res=>res.json()).then(data=>{
  
    if(data.error)
    M.toast({html: data.error, classes: 'rounded #c62828 red darken-3'});
    else{
    M.toast({html: data.message, classes: 'rounded ##00c853 green accent-4'});
        history('/signin');
    }

  })

}




const [name,setName]  = useState("");
const [email,setEmail]  = useState("");
const [password,setPassword]  = useState("");



  return (
    <div  id="mycard" className='container card'>

  <div className="row">
        <h4 id="myid">TODO-LIST</h4>
    <div id="inputji" className="input-field col s6">
      <input value = {name} onChange = {(e)=>setName(e.target.value)}   placeholder='Name'  type="text" className="validate"/>
      <input value = {email} onChange = {(e)=>setEmail(e.target.value)}  placeholder='@Email'  type="email" className="validate"/>
      <input value = {password} onChange = {(e)=>setPassword(e.target.value)}  placeholder='*Password'  type="password" className="validate"/>
    <button  onClick={()=> postData()} id = "buttonji" class="waves-effect waves-light btn">Submit</button><br/><br/>
    <Link id="linking" to="/Signin">Already Have An Account Sing In ?</Link>
    </div>



  </div>
        




    </div>
  )
}

export default Signup