import React, { useState ,useEffect, useContext} from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios' 
import { toast } from 'react-toastify'
const Loginpopup = ({setShowLogin}) => {

  const {url,setToken}=useContext(StoreContext)

  const [currentState,setCurrentState]=useState("Login")
  const [data,setData]=useState({
    name:"",
    email:"",
    password:""
  })

  const handleChange = (e) => {
    const  name= e.target.name;
    const  value= e.target.value;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  const onlogin=async(e)=>{
    e.preventDefault();
    let newurl=url
    if(currentState==="Login"){
      newurl=`${url}/api/user/login`
  }
  else{
    newurl=`${url}/api/user/register`
  }
    try {
      const response = await axios.post(newurl, data);
      
      if (response.status === 200) {
        setToken(response.data.token); // Assuming the token is returned in the response
        localStorage.setItem("token", response.data.token); // Store token in localStorage
        setShowLogin(false); // Close the popup on successful login
        
      }
       }
     catch (error) {
      // console.error("Error logging in:", error);
      console.log("Error logging in:", error.response.data.message);
      toast.error(error.response.data.message);
    }
  }
  // useEffect(() => {
  //   console.log("Data changed:", data);
  // },[data]);

  return (
    <div className='Login_popup'>
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login_popup_titlle">
          <h2>
            {currentState}
          </h2>
          <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className='login-popup-input'>
          {
            currentState==='Login'?<></>:
            <input type="text" name="name" onChange={handleChange} value={data.name} placeholder='Your Name ' aria-required/> 
          }
            <input type="email" name="email" onChange={handleChange} value={data.email} placeholder='Your email ' aria-required/> 
            <input type="password" name="password" onChange={handleChange} value={data.password} placeholder='Password ' aria-required/> 
        </div>
        <button type="Submit">{currentState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required/>
          <p>By continuing , i agree to the terms of use & privacy policy.</p>
          </div>
        {currentState ==='Login'
        ?<p>Create a new Account?<span onClick={()=>setCurrentState("Sign Up")}>Click Hera</span></p>
        :<p>Already have an account <span onClick={()=>setCurrentState("Login")}>Login here</span></p>}
        
    
      </form>
    </div>
  )
}

export default Loginpopup
