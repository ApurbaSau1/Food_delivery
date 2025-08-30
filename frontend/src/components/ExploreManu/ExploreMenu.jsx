import {React, useState,useEffect } from 'react'
import './ExploreManu.css'
import axios from 'axios'
// import {menu_list} from '../../assets/assets'
const ExploreMenu = ({categories,setCategories}) => {
const [menu_list,setMenuList] = useState([]);


const fetchMenuList = async () => {
    try {
        const response = await axios.get('https://food-delivery-backend-bu4t.onrender.com/api/food/listmenu');
        if (response.status === 200) {
            setMenuList(response.data.menu);
            // console.log(response.data.menu);
            
            
        } else {
            // toast.error("Failed to fetch menu data");
           
        }
    } catch (error) {
        // toast.error("Error fetching menu data");
         console.log(error);
    }
}
useEffect(() => {
    
    fetchMenuList();
}, []);



  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>
            Explore Our Menu
        </h1>
        <p className='explore-menu-text'>
            Discover a wide range of delicious dishes crafted with the finest ingredients. Our menu offers something for everyone, from appetizers to desserts, ensuring a delightful dining experience. Whether you're in the mood for classic favorites or adventurous new flavors, our carefully curated selections will satisfy your cravings and tantalize your taste buds.
        </p>
        <div className="explore-menu-list">
            {menu_list.map((item, index) => (
                <div onClick={()=>setCategories(prev=>prev===item.menu_name?"All":item.menu_name)} className="explore-menu-item" key={index}>
                    <img className={categories===item.menu_name?"active":""}src={`https://food-delivery-backend-bu4t.onrender.com/images/${item.image}`} alt={item.name} />
                    <h3>{item.menu_name}</h3>
                    
                </div>
            ))}
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
