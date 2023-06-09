import React, { useEffect } from 'react';
import "./train.css";
import { useState } from 'react';
import asyncPostCall from "../sevice";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Train({ setToken }) {
  const navigate = useNavigate();
  const [getTrainDetails, setGetTrainDetails] = useState([]);
  const [getBookTicket, setgetBookTicket] = useState([]);
  const [inputNoofseat, setInputNoofseat] = useState("");
  const [availableSeat, setAvailableSeat] = useState("");
  const [toogle, setToogle] = useState(false);
  const [cuurNoSeat, setCuurNoSeat] = useState("");
  const [trainid, setTrainId] = useState("");
  //console.log(getBookTicket, "ihihiu")
  const getTrainDetailsRes = async () => {
    const data = await asyncPostCall("/trains/get-trains", {}, "GET");
    if (data?.length > 0) {
      setGetTrainDetails(data);
    } else {
      return;
    }
  }
  const getBookTicketRes = async () => {
    const data = await asyncPostCall("/trains/train-ticket-byuser", {}, "POST");
    if (data?.length > 0) {
      setgetBookTicket(data);
    } else {
      return;
    }

  }

  const handleChooseTrain = (items, index) => {
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
  const handleLogout = () => {
    localStorage.removeItem("token");
    setCuurNoSeat("")
    setToken("")
    navigate("/");

  }

  const TicketBooking = async () => {
    const req = {
      numberOfSeats: cuurNoSeat,
      trainId: trainid

    }
    if (cuurNoSeat > 7) {
      toast.warning("At time no of seat less than 7");
      setCuurNoSeat("");
    } else {
      const data = await asyncPostCall("/trains/train-booking", req, "POST");
      if (JSON.stringify(data) != {}) {
        getBookTicketRes();
        getTrainDetailsRes();
        toast.success("Ticket booking succefully");
        setToogle(false);
        setCuurNoSeat("");
      } else {
        toast.error("Invalid request");
        return;
      }
    }
  }
  const handleCanceltoggole = async () => {
    setToogle(false);
    setCuurNoSeat("");
  }

  return (
    <div>
      <div className='train-header'>Train Ticket Booking App<button className='logout-btn' onClick={handleLogout} >Logout</button></div>
      <div className='ticket-container'>
        <div className='ticket-container-01'><span className='ticket-container-01-span train-main-box'>Booking Ticket </span>
       
          <div className='booking-container'>
            {

              getBookTicket.map((items, index) => {
                return (
                  <div key={index} className='ticket-box'>
                    <span>Train name  :{items?.trainId?.Trainname}</span>
                    <span>Seat no.  {items?.seatNumber + ""}</span>
                  </div>
                )
              })


            }
          </div>
       </div>
        <div className='ticket-container-02'><span className='ticket-container-01-span'>Show train Details</span><div>
          {toogle && <div>
            <span>TrainName:  {inputNoofseat}</span>
            <div>available seat :{availableSeat}</div>
            <div>Enter No.of Ticket :<input type='text' value={cuurNoSeat} onChange={(e) => setCuurNoSeat(e.target.value)} /></div>
            <button className='cancel-ticket-btn' onClick={() => handleCanceltoggole()}>Cancel</button> <button  className='book-ticket-btn' onClick={() => TicketBooking()}>Book</button>
          </div>}
        </div></div>
        <div className='ticket-container-03'><span className='ticket-container-01-span'>Train Available</span>
          <div className='Detail-Container' style={{ height: "auto", overflowY: "scroll" }}>         {
            getTrainDetails.map((items, index) => {
              return (
                <div className='main-boxx'>
                  <div key={index} className='train-details-card detailMainContainer'>
                    <span className='train-details-card-name'>Train name :{items.Trainname}</span>
                    <span>Available seats : {items.seats}</span>
                    <button  className='book-ticket-btn' onClick={() => {
                      handleChooseTrain(items, index)
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
