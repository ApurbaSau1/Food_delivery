import {React,useState,useEffect}from 'react'
import './Listmenu.css'
import axios from 'axios'
import { toast } from 'react-toastify'
const Listmenu = ({url}) => {
  const [list, setList] = useState([])


const fetchData = async () => {
  const response = await axios.get(`${url}/api/food/listmenu`);
  if (response.status === 200) {
    // console.log("Data fetched successfully");
    setList(response.data.menu);
    console.log(response.data.menu);

  } else {
    toast.error("Failed to fetch data");
  }
};
const deleteItem = async (id) => {
  const response = await axios.delete(`http://localhost:420/api/food/removemenu/${id}`);
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
      <h1>Menu List</h1>
      <h2>Total number of items: {list.length}</h2>
      <div className="list-table">
        <div className="menu-list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item._id} className="menu-list-table-format">
            <img src={`http://localhost:420/images/${item.image}`} alt={item.name} />
            <span>{item.menu_name}</span>
            <p className='Cursor' onClick={() => deleteItem(item._id)}>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Listmenu