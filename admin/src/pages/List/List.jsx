import {React,useState,useEffect}from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'

const List = ({url}) => {
  const [list, setList] = useState([])


const fetchData = async () => {
  const response = await axios.get(`${url}/api/food/list`);
  if (response.status === 200) {
    // console.log("Data fetched successfully");
    setList(response.data.foods);
  } else {
    toast.error("Failed to fetch data");
  }
};
const deleteItem = async (id) => {
  const response = await axios.delete(`http://localhost:420/api/food/remove/${id}`);
  if (response.status === 200) {
    toast.success(response.data.message);
    fetchData();
  } else {
    toast.error(response.data.message);
  }
};
useEffect(() => {
  fetchData();
}, []);

  return (
    <div className='list add flex-col'>
      <h1>Food List</h1>
      <h2>Total number of items: {list.length}</h2>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="list-table-format">
            <img src={`http://localhost:420/images/${item.image}`} alt={item.name} />
            <span>{item.name}</span>
            <span>{item.category}</span>
            <span>${item.price}</span>
            <p className='Cursor' onClick={() => deleteItem(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List