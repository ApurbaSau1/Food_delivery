import React, { useEffect } from 'react'
import { StoreContext } from '../../context/StoreContext'

import './Myorder.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
const Myorders = () => {
    const [data,setdata]=React.useState([]);
    const {url,token}=React.useContext(StoreContext);
  const fetchData=async()=>{
      const res=await axios.post(`${url}/api/order/userorders`,{},{headers:{token}})
      setdata(res.data.data);
        // console.log(res.data.data);
      
  }
  useEffect(()=>{
    if(token){
      fetchData();
    }
  },[]);

    return (
    <div className="myorders">
      <h1>My Orders</h1>
     <div className="container">
        {data.map((order,index)=>(
        <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
          <h2>{order.item.map((item,index)=>{
            if(index==order.item.length-1){
              return item.name+" X "+item.quantity;
            }
            else{
                return item.name+" X "+item.quantity+", ";
            }
          })}</h2>
            <h3>Total Price: ₹{order.amount}.00</h3>
            <p>Items :{order.item.length}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchData}>Track Order</button>
        </div>))}
     </div>
    </div>
  )
}

export default Myorders