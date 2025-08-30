import React, { useContext, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
const Verify = () => {
    const [searchParams,setSearchParams]=useSearchParams();
    const success=searchParams.get("success");
    const orderId=searchParams.get("orderId");
    const navigate=useNavigate();
    const {url}=useContext(StoreContext)
    const verifyPayment=async()=>{
        const res=await axios.post(`${url}/api/order/verify`,{
            orderId,
            success
        });
       if(res.data.success){
            navigate("/myorders");
        }
        else{
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[]);
  return (
    <div className="verify ">
      <div className="spinner"></div>
    </div>
  )
}

export default Verify