import React ,{useEffect ,useState} from 'react'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function SendMessage() {

    let [searchParams,setSearchParams] = useSearchParams();
    let currentId = searchParams.get('id');
    let userName = searchParams.get('name');
    let [message , setMessage] = useState({
      text:'',
    })
    let[msgState,setMsgState]=useState('');


    let getMessage=(e)=>{
        let myMessage = {...message};
        myMessage[e.target.name] = e.target.value;
        //console.log(myMessage);
        setMessage(myMessage);
   } 
     
   let sendMessage =async(e)=>
   {
        e.preventDefault();
        let {data}= await axios.post(`http://localhost:3000/api/v1/message/${currentId}`,message);
        console.log(data);
        if(data.message =='Dnoe ')
        {
          setMsgState("Message has been sent")
        }
   }

     
    useEffect(()=>{
     // getUser();
    },[])
  return (
    
  <div className="container text-center py-5 my-5 text-center">
    <form onSubmit={sendMessage}>
    <div className="card pt-5" >
      <a data-toggle="modal" data-target="#profile">
        <img src="img/avatar.png" className="avatar"/>
      </a>
      <h3 className="py-2">{userName}</h3>
      {msgState? <div className="alert alert-success w-50 m-auto mb-3">{msgState}</div>:""}
      <textarea name="text" onChange={getMessage} placeholder='Write a message' cols="10" rows="8" className='w-50 m-auto'></textarea>
      <button type='submit' className="message m-auto mt-3">Send Message</button>
    </div>
    </form>

  </div>

  )
}
