import React from 'react';
import { useState } from 'react'

import "./login.css";
import asyncPostCall from "../sevice";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
function Login({setToken}) {
       
    const navigate = useNavigate();
    const [login,setLogin] =useState(
        {
        email:"",
        password:""
    });
    const handleRegister = async(e)=>{
        e.preventDefault();
        const req={
            email:login?.email,
            password:login?.password
        }
        if( !login?.email && !login?.password){
         toast.warning("Please fill details");   
        }else{
    const data= await asyncPostCall("/users/login",req,"POST");
    if(data && typeof  data == "string"){
        localStorage.setItem("token", data);
    
        setLogin({
            email:"",
            password:""
        });
        toast.success("Registraion succefully")
        setToken(data)
        navigate("/train-dashboard");
       
    }else{
        setLogin({
            email:"",
            password:""
        });
        toast.error("Invalid  data eamil && password")
        return;
    }}
    }
   const NaviGateToSignUpage=()=>{
    navigate("/sign-up");
   } 
    const handleSignOnchange=(e)=>{
        setLogin({
            ...login,
            [e.target.name]: e.target.value,
          });
    
    }

  return (
    <div className="container">
    <div className="title">Login</div>
    <div >
        <form className="content" onSubmit={(e)=>handleRegister(e)}>
            <div className="user-details">
                <div className="input-box">
                    <span className="details">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;:</span>
                    <input className="text-type-box" type="text" name='email' onChange={(e)=>handleSignOnchange(e)} placeholder="Enter your email" required />
                </div>

                <div className="input-box">
                    <span className="details">Password :</span>
                    <input className="text-type-box" type="text" name='password' onChange={(e)=>handleSignOnchange(e)} placeholder="Enter your password" required />
                </div>
            </div>

            <div >
                <input className="button" type="submit" value="Login" />
            </div>
        </form>
    </div>
    <div className='last-content'><span>You don't have Account please press the </span> 
    <span className='last-content-span'  onClick={NaviGateToSignUpage}> Signup ?</span></div>
</div>
  )
}

export default Login;