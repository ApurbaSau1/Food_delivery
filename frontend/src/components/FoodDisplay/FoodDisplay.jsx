import React, { use, useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../context/StoreContext.jsx'
import FoodItem from '../FoodItem/FoodItem.jsx';
const FoodDisplay = ({categories}) => {
    const {food_list}=useContext(StoreContext);
  return (
    <div className='food-display' id='food-display'>
        <h2>
            Top dishes near you
            <div className="food_display_list">
                {food_list.map((item,index)=>{
                    // Filter food items based on the selected category
                     
                    if(categories==="All" || item.category===categories)
                        {
                        return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
                    }
                })                }
            </div>
        </h2>
    </div>
  )
}

export default FoodDisplay