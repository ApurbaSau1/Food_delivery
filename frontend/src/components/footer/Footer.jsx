import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
    <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} className='logo'alt="" />
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consectetur facilis, distinctio ut sed totam dolorem quod saepe exercitationem rem in inventore maiores, ipsa aliquid nesciunt sit blanditiis sunt dignissimos id. Nesciunt ea obcaecati consequatur libero iure deserunt architecto similique neque asperiores magni, culpa vel nulla at. Expedita, quidem libero. </p>
        <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="Facebook" />
                <img src={assets.instagram_icon} alt="Instagram" />
                <img src={assets.twitter_icon} alt="Twitter" />
                <img src={assets.linkedin_icon} alt="LinkedIn" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>Get InTouch</h2>
            <ul>
                <li>+91555454444</li>
                <li>apurbasau@gmail.com</li>
            </ul>
        </div>
        </div>
        <hr />
        <div className="footer-copyright">
            <p>© 2023 Apurba Sau. All rights reserved.</p>
        </div>
    </div>
 
  )
}

export default Footer