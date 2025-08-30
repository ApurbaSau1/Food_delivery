import {React,useState} from 'react'
import './Addmenu.css'
import { assets } from '../../assets/assets.js'
import axios from 'axios'
import { toast } from 'react-toastify'

const Addmenu = ({url}) => {
  const[image,setImage] = useState(false);
  const [data,setData] = useState({
          name: "",
      });

       const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };
    const onSubmitHandler =async (e) => {
e.preventDefault();//for not reload the page
const formData = new FormData();
formData.append("image", image);
formData.append("name", data.name);
const response = await axios.post(`${url}/api/food/addmenu`, formData);
if(response.status === 200){
    // console.log("Food item added successfully");
    setData({
        name: "",
    });
    setImage(false); // Reset the image after successful submission
    // e.target.reset(); // Reset the form fields
    toast.success(response.data.message);
}
else{
    // console.log("Failed to add food item");
    toast.error(response.data.message);
}


}

  return (
    <div className='add'>
      <h1>Add Menu</h1>
      <form action="" className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload Image </p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Enter product name" id="" required />
        </div>
        <button type='submit' className='add-btn'>Add Product</button>
      </form>
    </div>
  )
}

export default Addmenu