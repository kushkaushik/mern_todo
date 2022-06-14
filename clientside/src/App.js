import React, { createContext, useContext, useEffect, useReducer } from 'react';
import './App.css';
import Signup from './component/Signup'
import Nav from './component/Nav'
import Singin from './component/Singin';
import Home from './component/Home';
import {  BrowserRouter, Route , Routes, useNavigate} from 'react-router-dom';
import Todo from './component/Todo';
import {initialState,reducer} from './UserReducer.js/userReducer'
import EditTodo from './component/EditTodo';



export const UserContext = createContext();
const Routing = () =>{
  
  const {dispatch} = useContext(UserContext);
  const history = useNavigate()
  useEffect(() => {
   const User  = JSON.parse(localStorage.getItem("user"))
   console.log(User)
if(User){
  dispatch({type:"USER" , payload:User})
}else{
  history('/signin')
}
}, [])




  return (
    <Routes>
    <Route exact path='/' element={ <Home/>}/>
    <Route path='/Todo' element={ <Todo/>}/>
    <Route path='/Signin' element={ <Singin/>}/>
    <Route path='/Signup' element={ <Signup/>}/>
    <Route path='/edit' element={ <EditTodo/>}/>
   

     
        </Routes>
  )
}


function App() {
  const [state, dispatch]  = useReducer(reducer, initialState)
  return (
    <>
    <BrowserRouter>
    <UserContext.Provider value={{state,dispatch}}>
    
    <Nav/>
   
    <Routing/> 
  
    </UserContext.Provider>
    </BrowserRouter>
    </>

  );
}


export default App;
