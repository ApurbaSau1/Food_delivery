import {React,useState,useEffect} from 'react'
import axios from 'axios';
import './order.css'
import {assets} from "../../assets/assets"
import {toast} from 'react-toastify'

const order = ({url}) => {
  const [orders, setOrders] = useState([]);
  const fetchOrders = async () => {

    const response = await axios.get(url+"/api/order/list");
       
    const data = response.data;
    if (data.success) {
      setOrders(data.data);
      // console.log(data.data);
    }
    else{
      toast.error(data.message);
    }
  };
  const statusHandler = async (event,orderId) => {
  const response=await axios.post(url+"/api/order/status",{
    orderId,
    status:event.target.value
  })
  if(response.data.success){
    toast.success(response.data.message);
    await fetchOrders();
  }
}
  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="order">
      <h2>Order List</h2>
        {orders.map((order,index)=>(
          <div key={index} className="order_card">
            {index + 1}.
            <img src={assets.parcel_icon} alt="" />
          <div className="order-item-food">
            <p>
              {order.item.map((item, index) => {
                if(index === order.item.length - 1) {
                  return item.name+" x "+item.quantity
                }
                else{
                  return item.name+" x "+item.quantity+", "
                }
})}
            </p>
            <p className="order-item-name">
              {
                order.address.firstName + " " + order.address.lastName
              }
            </p>
            <div className="order-item-address">
              <p>{
                order.address.street + ", " + order.address.city + ", " + order.address.state + " " + order.address.zip
              }</p>
            </div>
            <p className="order-item-phone">
              {
                order.address.phone
              }
          </p>
        </div>
          <p>Items :{order.item.length}</p>
          <p>Total Price :₹{order.amount}</p>
          <select onChange={(event) => statusHandler(event, order._id)} value={order.status}>
            <option value="Food Processing">Food Processing</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
          </div>
      ))}
    </div>
  )
}

export default order