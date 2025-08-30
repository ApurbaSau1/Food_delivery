import React, { useContext,useEffect,useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PlaceOrder = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setData]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    phone:"",
  })
  const onChangeHandler=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const placeorder=async(e)=>{
    e.preventDefault()
    const orderItems=[]
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData={
      address:data,
      items:orderItems,
      total:getTotalCartAmount()+2
    }
const response=await axios.post(`${url}/api/order/place`,orderData,{headers:{token}})
// console.log(response);
// console.log(orderData);
// console.log(token)

if(response.status === 200){
  
  const session_url=response.data.session_url;

  // console.log(session_url);
  
  window.location.replace(session_url);
  // Handle successful order placement
}
else{
  alert("Error placing order. Please try again.")
}
  }
  const navigate =useNavigate()
  useEffect(()=>{
    if(!token){
      navigate('/cart')
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeorder} className='PlaceOrder'>
      <div className="place-order-left">
        <p className='title'>
          Delivery Information
        </p>
        <div className="multi-fields">
          <input required name="firstName" type="text" placeholder='First Name' onChange={onChangeHandler} value={data.firstName} />
          <input required name="lastName" type="text" placeholder='Last Name' onChange={onChangeHandler} value={data.lastName} />
        </div>
        <input required name="email" type="email" placeholder='Email Address' onChange={onChangeHandler} value={data.email} />
        <input required name="street" type="text" placeholder='Street' onChange={onChangeHandler} value={data.street} />
        <div className="multi-fields">
          <input required name="city" type="text" placeholder='City' onChange={onChangeHandler} value={data.city} />
          <input required name="state" type="text" placeholder='State' id="" onChange={onChangeHandler} value={data.state} />
        </div>
        <div className="multi-fields">
          <input required name="zip" type="text" placeholder='Zip Code' onChange={onChangeHandler} value={data.zip} />
          <input required name="country" type="text" placeholder='Country' id="" onChange={onChangeHandler} value={data.country} />
        </div>
        <input required name="phone" type="text" placeholder='Phone' onChange={onChangeHandler} value={data.phone} />
      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
                <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder