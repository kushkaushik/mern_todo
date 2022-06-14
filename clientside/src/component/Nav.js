import React, { useContext } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { UserContext } from '../App'

const Nav = () => {
const {state,dispatch} = useContext(UserContext);
const history = useNavigate();
const dataRender = () => {
  if(state!==null){
    return [
    
      <li><Link to="/Todo">Add-Todo</Link></li>,
      <button  class="waves-effect waves-light btn #f44336 red" onClick={()=>{
        localStorage.clear();
        dispatch({type:"CLEAR"})
        history('/signin')
      }} >Logout</button>
    ]
  }
  else{ 
    return [
    <li><Link to="/Signup">SignUp</Link></li>,
    <li><Link to="/Signin">SignIn</Link></li>,

  ]
  }
}

  return (
  <>

<nav>
    <div id = "Navigation" class="nav-wrapper ">
      <Link  to={state === null ? "/signin":"/"} class="brand-logo left">Todo</Link>
      <ul id="nav-mobile" class="right">
      {dataRender()}
       
      </ul>
    </div>
  </nav>


  </>
  )
}

export default Nav