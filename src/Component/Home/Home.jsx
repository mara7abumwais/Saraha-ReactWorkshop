import React,{useState  , useEffect} from 'react'
import { Link ,  useNavigate  } from 'react-router-dom';
import axios from 'axios';

export default function Home() {
 
  let [users,setUsers] = useState([]);
  let navigate = useNavigate();

  async function getUsers ()
  {
      let {data} = await axios.get("http://localhost:3000/api/v1/auth/allusers")
      setUsers(data.users)     
  }
  useEffect ( ()=>{
    getUsers();
  },[])
  
  function sendUserMessage(id)
  {
    navigate({
      pathname:'/SendMessage',
      search:`?id=${id}`,
    })
  }
 
  return (
 <>
<div className="container text-center my-5 py-5 ">
  <h4>Sarahah allows you to receive constructive feedback from your friends and co-workers</h4>
  <div className="buttons d-flex justify-content-center align-items-center  flex-column">
    <Link to="/Login" className="btn btn-default-outline my-4"><i className="fas fa-user" /> Login</Link>
    <Link to="/Register" className="btn btn-default-outline"><i className="far fa-edit" /> Register</Link>
  </div>

  <div className='row mt-5' >
    {users.map( (user,index) =>
        <div className='col-md-2' onClick={()=>sendUserMessage(user._id)} key={index}>
          <h2>{user.userName}</h2>
        </div>  
    )}
  </div>
</div>

 </>
  )
}