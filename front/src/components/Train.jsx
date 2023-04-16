import React, { useEffect } from 'react';
import "./train.css";
import { useState } from 'react';
import asyncPostCall from "../sevice";
import { useNavigate } from "react-router-dom";

function Train({setToken}) {
  const navigate = useNavigate();
  const [getTrainDetails, setGetTrainDetails] = useState([]);
  const [getBookTicket,setgetBookTicket]=useState([]);
  const [inputNoofseat,setInputNoofseat]=useState("");
  const [availableSeat,setAvailableSeat]=useState("");
  const [toogle,setToogle]=useState(false);
  const [cuurNoSeat,setCuurNoSeat]=useState("");
  const [trainid,setTrainId]=useState("");
  //console.log(getBookTicket, "ihihiu")
  const getTrainDetailsRes = async () => {
    const data = await asyncPostCall("/trains/get-trains", {}, "GET");
    if (data?.length > 0) {
      setGetTrainDetails(data);
    }else{
      return;
    }
  }
  const getBookTicketRes=async()=>{
    const data = await asyncPostCall("/trains/train-ticket-byuser", {}, "POST");
    if (data?.length > 0) {
      setgetBookTicket(data);
    }else{
      return;
    }
  
  }

  const handleChooseTrain=(items,index)=>{
    setInputNoofseat(items?.seats);
    setAvailableSeat(items?.Trainname);
    setTrainId(items?._id);
    setToogle(true)
   //   console.log(items)
  }
  useEffect(() => {
    getTrainDetailsRes();
    getBookTicketRes();
  }, [])
const handleLogout=()=>{
  localStorage.removeItem("token");
  setToken("")
  navigate("/");

}

const TicketBooking= async()=>{
  const req={
      numberOfSeats:cuurNoSeat,
      trainId:trainid
  
  }
 const data = await asyncPostCall("/trains/train-booking", req, "POST");
 if(JSON.stringify(data)!={}){
  getBookTicketRes();

 }
}
  return (
    <div>
      <div className='train-header'>Train Ticket Booking App<button className='logout-btn' onClick={handleLogout} >Logout</button></div>
      <div className='ticket-container'>
        <div className='ticket-container-01'><span className='ticket-container-01-span'>Booking Ticket </span><div>
          <div>
            <span>Trainname</span>
            <div>Seat no.</div>
          </div>
        </div> </div>
        <div className='ticket-container-02'><span className='ticket-container-01-span'>Show train Details</span><div>
     {toogle && <div> 
           <span>TrainName:  {inputNoofseat}</span>
          <div>available seat :{availableSeat}</div>
          <div>Enter No.of Ticket :<input  type='text' value={cuurNoSeat}  onChange={(e)=>setCuurNoSeat(e.target.value)}/></div>
        <button onClick={()=>setToogle(false)}>Cancel</button> <button onClick={()=>TicketBooking()}>Book</button>
      </div>}
        </div></div>
        <div className='ticket-container-03'><span className='ticket-container-01-span'>Train Available</span>
        <div>         {
          getTrainDetails.map((items,index)=>{
              return (
                <div key={index}>
            <span>{items.Trainname}</span>
            <div><span>Available seats : {items.seats}</span><button  onClick={()=>{
              handleChooseTrain(items,index)
            }}>Click book ticket</button></div>
          </div>
              )
          })
          
         }
         </div>

          </div>
      </div>
      <div className='footer'>footer</div>
    </div>
  )
}


export default Train
