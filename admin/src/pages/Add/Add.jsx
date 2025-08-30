import {React,useEffect,useState} from 'react'
import { assets } from '../../assets/assets.js'

import axios from 'axios'
import { toast } from 'react-toastify'
import './Add.css'




const Add = ({url}) => {
    const [list,setList] = useState([]);
    const[image,setImage] = useState(false);
    const [data,setData] = useState({
        name: "",
        description: "",
        category: "",
        price: 0
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
formData.append("description", data.description);
formData.append("category", data.category);
formData.append("price", data.price);
// formData.append("data", JSON.stringify(data));
// console.log(formData.get("data"));


const response = await axios.post(`${url}/api/food/add`, formData);
if(response.status === 200){
    // console.log("Food item added successfully");
    setData({
        name: "",
        description: "",
        category: "",
        price: 0
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
const fetchData = async () => {
  const response = await axios.get(`${url}/api/food/listmenu`);
  if (response.status === 200) {
    // console.log("Data fetched successfully");
    setList(response.data.menu);
    // console.log(response.data.menu);

  } else {
    toast.error("Failed to fetch data");
  }
};

useEffect(() => {
    fetchData();

  
}, []);

  return (
    <div className='add'>
        <form action="" className="flex-col" onSubmit={onSubmitHandler}>

            <div className="add-img-upload flex-col">
                <p>Upload Image </p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Enter product name" id="" required/>
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name="description" id="" rows="6" placeholder='Write here...' required></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Product Category</p>
                    <select onChange={onChangeHandler} value={data.category} name="category" id="">
                        <option value=" ">Select Category</option>
                        {list.map((element) => (
                            <option key={element._id} value={element.menu_name}>{element.menu_name}</option>
                        ))}
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Price</p>
                    <input onChange={onChangeHandler} value={data.price} type="number" name="price" id="" placeholder='$20' required/>
                </div>
            </div>
                <button type='submit' className='add-btn'>Add Product</button>
        </form>
        
        </div>
  )
}

export default Add