import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App';

const Home = () => {
  const {state} = useContext(UserContext)
  const [userdata,setUserdata]  = useState([]);
  const history = useNavigate();


  useEffect(() => {
    fetch("/showall",{
     headers:{
      "authorization": "Kush "+localStorage.getItem("jwt")

     }
    }).then(res=>res.json()).then(data=>{
      console.log(data);
        setUserdata(data.datahere);
    })
  
 
  }, [])
  








  const mydelete =  (postId)=>{
    fetch("/del/"+postId,{
      "method":"delete",
      headers:{
        "Authorization":"Kush "+localStorage.getItem("jwt"),
    }

    }).then(res=>res.json()).then(result=>{
      console.log(result);

      const newData = userdata.filter(item=>{
          return item._id !== result._id
      })

      setUserdata(newData)
      

    })
  }





  return (

    <div className='container my-4'>
        <h4 style = {{marginLeft:"38%",padding:"0 3%"}}>Todo-List</h4>
<table className='centered card'>
        <thead>
          <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Todo-Description</th>
              <th>Action</th>
          </tr>
        </thead>
{userdata.map((e)=>{
  return(
    <>
    
    <tbody>
          <tr>
            <td>{e.postedby.name}</td>
            <td>{e.title}</td>
            <td>{e.desc}</td>
              {e.postedby._id === state._id &&   <td>
            <button  onClick={()=>mydelete(e._id)} style={{marginRight:"7px"}} className="waves-effect waves-light btn">Delete</button>
            <button onClick={()=>{

              localStorage.setItem("myid",e._id);
              localStorage.setItem("title",e.title);
              localStorage.setItem("desc",e.desc);
              history("/edit")
            }}  className="waves-effect waves-light btn">Edit</button></td>}
          
          </tr>

        </tbody>
    

    </>
  )
})}
     



      </table>
            
      <Link style={{marginLeft:"44%"}} to = "/Todo"><button  style={{marginRight:"7px"}}  className="waves-effect waves-light btn">Add-Todo</button></Link>
    </div>
  )
}

export default Home