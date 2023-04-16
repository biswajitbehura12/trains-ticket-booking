
import './App.css';
import React, {  useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route,Navigate, } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import Train from './components/Train';
import { ToastContainer } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [token,setToken]=useState("")
  useMemo(()=>{
setToken(localStorage.getItem("token"))
  },[token])

  return (
    <div><ToastContainer/>
    <BrowserRouter>
    <Routes>
     <Route path="/" element={
      token ? <Navigate to="/train-dashboard"/>:<Login setToken={setToken} />
     } />
     <Route path="/sign-up" element={
     token ? <Navigate to="/train-dashboard"/>:<Signup setToken={setToken}/> 
     } />
     <Route path="/train-dashboard" element={  token?<Train setToken={setToken} />:<Navigate to="/"/>}/>
          
    </Routes>
  </BrowserRouter>
  </div>
  );
}

export default App;
