import React,{ useState } from 'react'
import "./signup.css";
import asyncPostCall from "../sevice";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
 /// import 'react-toastify/dist/ReactToastify.css';
function Signup({setToken}) {
    const navigate = useNavigate();
const [signup,setSignup] =useState(
    {
    fullName:"",
    email:"",
    password:""
});
const handleRegister = async(e)=>{
    e.preventDefault();
    const req={
        fullName:signup?.fullName,
        email:signup?.email,
        password:signup?.password
    }
    if(!signup?.fullName && !signup?.email && !signup?.password){
     toast.warning("Please fill details");   
    }else{
const data= await asyncPostCall("/users/register",req,"POST");
if(data && typeof  data == "string"){
    localStorage.setItem("token", data);

    setSignup({
        fullName:"",
        email:"",
        password:""
    });
    toast.success("Registraion succefully")
    setToken(data)
    navigate("/train-dashboard");
   
}else{
    setSignup({ ...signup,
        email:"",
        password:""
    });
    toast.error("Invalid  data eamil && password")
    return;
}}
}
const NaviGateToLoginage=()=>{
    navigate("/");
   } 
const handleSignOnchange=(e)=>{
    setSignup({
        ...signup,
        [e.target.name]: e.target.value,
      });

}

    return (

        <div className="container">
       
            <div className="title">Registration</div>
            <div >
                <form className="content"  onSubmit={(e)=>handleRegister(e)}>
                    <div className="user-details">
                        <div className="input-box">
                            <span className="details">Full Name :</span>
                            <input className="text-type-box" type="text" value={signup?.fullName} name='fullName' onChange={(e)=>handleSignOnchange(e)} placeholder="Enter your name" />
                        </div>
                        <div className="input-box">
                            <span className="details">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;:</span>
                            <input className="text-type-box" type="text" value={signup?.email} name='email' placeholder="Enter your email" onChange={(e)=>handleSignOnchange(e)} />
                        </div>

                        <div className="input-box">
                            <span className="details">Password :</span>
                            <input className="text-type-box" name='password' value={signup?.password} type="password" onChange={(e)=>handleSignOnchange(e)} placeholder="Enter your password"/>
                        </div>
                    </div>

                    <div >
                        <input className="button"  type="submit" value="Register" />
                    </div>
                </form>
            </div>
            <div className='last-content'><span>You  have Account please press the </span> 
    <span className='last-content-span' onClick={NaviGateToLoginage}> SignIn ?</span></div>
        </div>
    )
}

export default Signup