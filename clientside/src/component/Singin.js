import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import M from 'materialize-css'
import { UserContext } from '../App'

const Singin = () => {

const { dispatch} = useContext(UserContext);   
const history = useNavigate();
const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

 
const datahere = ()=>{

  fetch("/signup",{
    "method":"POST",
    headers:{
      "Content-Type":"application/json",
      'Accept': 'application/json'

    },
    body:JSON.stringify({
      email,password
    })
  }).then(res=>res.json()).then(data=>{
    console.log(data);
 
    if(data.error)
   { M.toast({html: data.error, classes: 'rounded #c62828 red darken-3'});}
    else{
      localStorage.setItem("jwt",data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
     dispatch({type:"USER" , payload:data.user})  
      M.toast({html: "SucessFully Sign-In", classes: 'rounded ##00c853 green accent-4'});
      history('/');
    }
  })
}

  return (
    <div  id="mycard" className='container card'>

  <div className="row">
        <h4 id="myid">TODO-LIST</h4>
    <div id="inputji" className="input-field col s6">
      <input value={email} onChange = {(e)=>setEmail(e.target.value)}  placeholder='@Email' type="text" className="validate"/>
      <input value={password} onChange = {(e)=>setPassword(e.target.value)}  placeholder='*Password'  type="password" className="validate"/>
    <button onClick={()=>datahere()} id = "buttonji" class="waves-effect waves-light btn">Sing In</button><br/><br></br>
 
  
    <Link id="linking" to="/Signup">Don't Have Any Account Sing Up ?</Link>
    </div>



  </div>
        




    </div>
  )
}

export default Singin