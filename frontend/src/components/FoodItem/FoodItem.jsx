import {React,useContext }from 'react'
import './FoodItem.css'
import {assets} from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const FoodItem = ({id,name,description,price,image}) => {
const {cartItems,  addToCart, removeFromCart,url} = useContext(StoreContext);
  return (
    <div className='food-item'>
       
        <div className="food-item-img-container">
            <img className='food-item-image' src={url+"/images/"+image} alt={name} />
            {!cartItems[id]
                ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white}alt=''/>
                :<div className="food-item-count">
                    <img className='remove' onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=''/>
                    <p>{cartItems[id]}</p>
                    <img className='remove' onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=''/>

                    </div> 
            }
        </div>
        <div className="food-item-details">
            <div className="food-item-name-rating">
                <p>
                    {name}
                </p>
                <img src={assets.rating_starts} alt="rating" />
            </div>
            <p className='food-item-description'>
                {description}
            </p>
            <p>
                <span className='food-item-price'>{price}</span>
            </p>
            </div>
        </div>
  )
}

export default FoodItem